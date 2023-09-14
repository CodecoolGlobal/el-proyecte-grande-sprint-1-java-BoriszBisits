import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function ProjectList() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState("");
    const [membersName, setMembersName] = useState([]);
    const [allMembers, setAllMembers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [coworkerId, setCoworkerId] = useState(null);

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
        fetch("http://localhost:8080/projects")
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
        fetch("http://localhost:8080/project/members")
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
        fetch("http://localhost:8080/newprojects", {
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
        fetch("http://localhost:8080/project/members", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify( memberId ),
        })
            .then((res) => {
                if (res.ok) {
                    fetchMembers()
                }
            })
            .catch((error) => {
                console.error("Error adding coworker:", error);
            });
    }

    function filterMembers() {
        return allMembers.filter((member) =>
            member.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    return (
        <div className="container">
            <h1 className="title">Projects</h1>
            <div className="project-list">
                {projects.map((project, index) => (
                    <p
                        key={index}
                        className="project"
                        onClick={() => navigate(`/project/${project.id}`)}
                    >
                        {project.name}
                    </p>
                ))}
            </div>
            <div className="new-project-form">
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
                    <button type="submit">Add new project</button>
                </form>
            </div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search members"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setFilteredMembers(filterMembers());
                    }}
                />
            </div>
            <div className="member-list">
                <h2>All Members</h2>
                <ul>
                    {filteredMembers.map((member) => (
                        <div key={member.id}>
                            <li>{member.name}</li>
                            <button onClick={() => handleAddCoworker(member.id)}>
                                Add Coworker
                            </button>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ProjectList;
