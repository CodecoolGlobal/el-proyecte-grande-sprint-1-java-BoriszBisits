import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Debug from "../components/Debug";
import "../projectlistsytle.css";

function ProjectList() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState("");
  const [membersName, setMembersName] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [eventCount, setEventCount] = useState(() => 0);

  const membersPerPage = 10;

  function handleAddMember() {
    const updatedMembers = [...membersName, ""];
    setMembersName(updatedMembers);
  }

  function handleChange(onChangeValue, i) {
    const updatedMembers = [...membersName];
    updatedMembers[i] = onChangeValue.target.value;
    setMembersName(updatedMembers);
  }

  useEffect(() => {
    fetchProjects();
    fetchMembers();
  }, []);

  function fetchProjects() {
    fetch("/projects")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch projects");
        }
        return res.json();
      })
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }

  function fetchMembers() {
    fetch("/project/members")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch members");
        }
        return res.json();
      })
      .then((data) => {
        setAllMembers(data);
        setFilteredMembers(data);
      })
      .catch((error) => {
        console.error("Error fetching members:", error);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const users = membersName.map((name) => ({ name }));
    const data = {
      name: newProject,
      members: users,
    };
    fetch("/newprojects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          setNewProject("");
          fetchProjects();
        }
      })
      .catch((error) => {
        console.error("Error creating project:", error);
      });
  }

  function handleAddCoworker(memberId) {
    fetch("/project/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memberId),
    })
      .then((res) => {
        if (res.ok) {
          fetchMembers();
        }
      })
      .catch((error) => {
        console.error("Error adding coworker:", error);
      });
  }

  function filterMembers(searchQuery) {
    return allMembers.filter((member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Pagination logic
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredMembers.length / membersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container">
      <h1 className="title">My Projects:</h1>
      <div className="project-circles">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-circle"
            onClick={() => navigate(`/project/${project.id}`)}
          >
            {project.name}
          </div>
        ))}
      </div>
      <div className="new-project-form-container">
        <div className="new-project-form">
          <h2>Create New Project:</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
            />
            <button type="button" onClick={() => handleAddMember()}>
              Add Members
            </button>
            {membersName.map((data, i) => (
              <input
                key={i}
                onChange={(e) => handleChange(e, i)}
                placeholder={`Member ${i + 1}`}
              />
            ))}
            <button type="submit">Create Project</button>
          </form>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search members"
            value={searchQuery}
            onChange={(e) => {
              setEventCount(old => old+1);
              const newSearchQuery = e.target.value;
              setSearchQuery(newSearchQuery);
              setFilteredMembers(filterMembers(newSearchQuery));
            }}
          />
        </div>
        <Debug><strong>Evenet count: </strong>{eventCount}</Debug>
        <div className="member-list">
          <h2>All Members</h2>
          <ul>
            {currentMembers.map((member) => (
              <div key={member.id}>
                <li>{member.name}</li>
                <button onClick={() => handleAddCoworker(member.id)}>
                  Add Coworker
                </button>
              </div>
            ))}
          </ul>
          <nav>
            <ul className="pagination">
              {currentMembers.length > membersPerPage && (
                <li className="page-item">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    className="page-link"
                  >
                    Previous
                  </button>
                </li>
              )}
              {pageNumbers.map((number) => (
                <li key={number} className="page-item">
                  {currentPage === number ? (
                    <button
                      onClick={() => paginate(number)}
                      className={`page-link active`}
                    >
                      {number}
                    </button>
                  ) : null}
                </li>
              ))}
              {currentMembers.length > membersPerPage && (
                <li className="page-item">
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    className="page-link"
                  >
                    Next
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default ProjectList;
