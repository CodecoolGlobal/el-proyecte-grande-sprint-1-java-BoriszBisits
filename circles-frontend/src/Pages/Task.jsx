import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function Task() {
    const { id } = useParams();
    const { taskId } = useParams();
    const [task, setTask] = useState([]);

    useEffect(() => {

        fetch(`/projectByid/${id}/task/${taskId}`)
            .then((res) => res.json())
            .then((data) => {
                setTask(data);
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
    }, []);

  /*  function handleSubmit(e) {
        e.preventDefault();*/


     /*   fetch("http://localhost:8080/new-task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => res);

        setNewTaskName("");
        setDeadLine("");
        setMembers([]);
    }*/

    return (
        <div className="container">
            <h1 className="title">Project1</h1>
            <div className="project-list">
                {task.subTaskList && task.subTaskList.map((subTask, i) => (
                    <div key={i} className="project">
                        <p>
                            {subTask.name}
                        </p>
                    </div>
                ))}
            </div>
           {/* <form onSubmit={handleSubmit} className="new-project-form">
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={newTaskName} onChange={(e) => { setNewTaskName(e.target.value) }} />
                </div>
                <div>
                    <label htmlFor="deadline">Deadline</label>
                    <input type="text" id="deadline" value={deadline} onChange={(e) => { setDeadLine(e.target.value) }} />
                </div>
                <div>
                    <label htmlFor="add-member">Add Member</label>
                    <input type="text" id="add-member" value={members} onChange={(e) => { setMembers(e.target.value) }} />
                    <button type="button">Add Members</button>
                </div>
                <button type="submit">Add new task</button>
            </form>*/}
        </div>
    );
}

export default Task;
