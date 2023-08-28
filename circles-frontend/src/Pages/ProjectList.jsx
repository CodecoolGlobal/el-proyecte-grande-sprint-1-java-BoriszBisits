import { useEffect, useState } from "react"


function ProjectList() {

    const [projects, setProjects] = useState(null);
    const [newProjects, setNewProjects] = useState(null);



    useEffect(() => {

        // const projectList = [
        //     { name: "project1" },
        //     { name: "project2" },
        //     { name: "project3" },
        // ]
        // setProjects(projectList);

        fetch("http://localhost:8080/projects")
        .then((res) => res.json())
        .then((data) => {
            setProjects(data)
        })

    }, [])


    function handleSubmit(e) {

        e.preventDefault()
             
const data = {name: newProjects}
console.log("data", data)
fetch("http://localhost:8080/newprojects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

    }

    return (
        <div>
            <h1>Projects</h1>
            <ul>
                {projects &&
                    projects.map((project) =>
                        <li>{project.name}</li>)}
            </ul>
            <div>
                <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" onChange={(e) => {setNewProjects(e.target.value)}} />
                    <button type="submit">Add new project</button>
                </ form>
            </div>
        </div>
    )


}
export default ProjectList;