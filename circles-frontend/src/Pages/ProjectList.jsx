import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function ProjectList() {
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/projects")
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
            });
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        fetch("http://localhost:8080/newprojects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: newProject }),
        }).then((res) => res);

        // Clear the input field after submitting
        setNewProject("");
    }

    return (
        <div className="container">
            <h1 className="title">Projects</h1>
            <div className="project-list">
                {projects.map((project, index) => (
                    <p
                        key={index}
                        className="project"
                        onClick={(e) => navigate(`/project/${project.id}`)}
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
                    <button type="submit">Add new project</button>
                </form>
            </div>
        </div>
    );
}

export default ProjectList;
