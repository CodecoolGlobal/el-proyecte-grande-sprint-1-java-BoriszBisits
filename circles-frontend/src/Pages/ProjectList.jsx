import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "../App.css";

function ProjectList() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState("");
    const [membersName, setMembersName] = useState([]);

    function handleAddMember() {
        const abc = [...membersName, []]
        setMembersName(abc);
    }

    function handleChange(onChangeValue, i) {
        const inputdata = [...membersName]
        inputdata[i] = onChangeValue.target.value
        setMembersName(inputdata)
    }


    useEffect(() => {
        fetchProjects();
    }, []);

    function fetchProjects() {
        fetch("http://localhost:8080/projects")
            .then((res) => res.json())
            .then((data) => {
                console.log("data " + JSON.stringify(data))
                setProjects(data);
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
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={newProject}
                        onChange={(e) => setNewProject(e.target.value)}
                    />
                       <div>
                    <button type="button" onClick={() => handleAddMember()}>Add Members</button>
                    {membersName.map((data,i) => {
                        return(
                            <input onChange={e => handleChange(e,i)}/>
                        )
                    })}

                </div>
                
                    <button type="submit">Add new project</button>
                </form>
            </div>
        </div>);
}
export default ProjectList;
