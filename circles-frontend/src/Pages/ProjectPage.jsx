import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProjectPage() {
    const { projectId } = useParams();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`/projectByid/${projectId}`)
            .then((res) => res.json())
            .then((data) => {
                setTasks(data);
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
    }, [projectId]);

    return (
        <div>
            <h1>Tasks for Project {projectId}</h1>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>{task.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default ProjectPage;
