import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import HeaderBar from '../Components/HeaderBar'
import Button from '@mui/material/Button';


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

  console.log("token" + localStorage.token)
  console.log("name" + localStorage.username)




  function fetchProjects() {
    const token = localStorage.getItem('token');
    const leader = localStorage.getItem('username')

    const headers = {
      'Authorization': `Bearer ${token}`
    };

    fetch(`/api/projectlist/projects/${leader}`, {
      method: 'GET',
      headers: headers
    })
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
     const token = localStorage.getItem('token');

    const headers = {
      'Authorization': `Bearer ${token}`
    };

    fetch("/api/projectlist/project/members", {
      method: 'GET',
      headers: headers
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch members");
        }
        return res.json();
      })
      .then((data) => {
        data=data.filter(member=>member.name!==localStorage.getItem("username"))
        setAllMembers(data);
        setFilteredMembers(data);
      })
      .catch((error) => {
        console.error("Error fetching members:", error);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    let leader = localStorage.getItem('username')

    const users = membersName.map((name) => ({ name }));
    const data = {
      name: newProject,
      members: users,
      leader: leader,
    };
    console.log("leader" + data.leader)

    let token = localStorage.getItem('token')
    fetch("/api/projectlist/newprojects", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,

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
    let data={memberId: memberId,
    leader:localStorage.getItem('username')}
    let token = localStorage.getItem('token')

    fetch("/api/projectlist/project/members", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,

        "Content-Type": "application/json",
      },
      body: JSON.stringify(data ),
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
      <HeaderBar />
      <Typography variant={"h3"} style={{ marginBottom: "50px", textAlign: 'center', marginTop: '20px' }} className="title">My Projects</Typography>
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
            <Typography variant={"h4"} style={{ marginBottom: "20px", textAlign: 'left', marginTop: '20px' }}>Create New Project:</Typography>

          <form onSubmit={handleSubmit}>
            <TextField
                variant="outlined"
              label={"Project title"}
              type="text"
              id="name"
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
                style={{ marginBottom: "20px", textAlign: 'left', marginTop: '20px' }}
            />
              <Button variant="contained"
                      color="primary"
                      style={{ marginTop: '16px' }}
                      type="submit">Create Project</Button>

            {membersName.map((data, i) => (
              <TextField
                type="search"
                key={i}
                onChange={(e) => handleChange(e, i)}
                placeholder={`Member ${i + 1}`}
              />
            ))}


          </form>
        </div>
        <div className="search-bar">
            <Button type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginBottom: "20px", float: 'right', marginTop: '20px' }}
                    onClick={() => handleAddMember()}

            >
                Add Members
            </Button>
          <TextField
              variant="outlined"
            type="search"
            label="Search members"
            value={searchQuery}
              style={{ marginBottom: "20px", float: 'right', marginTop: '20px' }}
            onChange={(e) => {
              // TODO: if the search is ever done by the backend
              //       then use Debouncing
              setEventCount(old => old+1);
              const newSearchQuery = e.target.value;
              setSearchQuery(newSearchQuery);
              setFilteredMembers(filterMembers(newSearchQuery));
            }}
          />

        </div>

        <div className="member-list">
          <Typography variant={"h5"} style={{ marginBottom: "20px", textAlign: 'right', marginTop: '20px' }}>All Members</Typography>
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
