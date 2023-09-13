import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "../App.css";

function ProjectList() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState("");

    useEffect(() => {
        fetchProjects();
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
                console.log("data " + JSON.stringify(data));
                setProjects(data);
            })
            .catch((error) => {
                console.error("Error fetching projects:", error);
            });
    }


    function handleSubmit(e) {
        e.preventDefault();

        fetch("http://localhost:8080/newprojects", {
            method: "POST", headers: {
                "Content-Type": "application/json",
            }, body: JSON.stringify({name: newProject}),
        }).then((res) => {
            if (res.ok) {
                setNewProject("");
                fetchProjects();
            }
        });
    }

    return (<div className="container">
        <h1 className="title">Projects</h1>
        <div className="project-list">
            {projects.map((project, index) => {
                console.log("Project ID:", project.id);


                const projectNameParts = project.name.split(":");
                const actualPart = projectNameParts[1];
                const cleanedHelloPart = actualPart.substring(1, actualPart.length - 2);
                return (
                    <p
                        key={index}
                        className="project"

                        onClick={(e) => navigate(`/project/${project.id}`)}
                    >

                        {cleanedHelloPart}
                    </p>
                );
            })}
        </div>
        <div className="new-project-form">
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input
                    type="text"
                    id="name"
                    value={newProject}
                    onChange={(e) => setNewProject(e.target.value)}
                />
                <button type="submit">Add new project</button>
            </form>
        </div>
    </div>);
}
export default ProjectList;
