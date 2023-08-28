import { useEffect, useState } from "react"


function ProjectList() {

    const [projects, setProjects] = useState(null);

    useEffect(() => {

        const projectList = [
            { name: "project1" },
            { name: "project2" },
            { name: "project3" },
        ]
        setProjects(projectList);

    }, [])

    return (
        <div>
            <h1>Projects</h1>
            <ul>
                {projects &&
                    projects.map((project) =>
                        <li>{project.name}</li>)}
            </ul>

        </div>
    )


}
export default ProjectList;