import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../App.css'; // Import your CSS file

function Project() {

    const [newTaskName, setNewTaskName] = useState("");
    const [tasks, setTasks] = useState([]);
    const [members, setMembers] = useState([]);
    const [deadline, setDeadLine] = useState("");

    useEffect(() => {
        // Simulated task list
        const taskList = [
            { _id: "1", name: "task1" },
            { _id: "2", name: "task2" },
            { _id: "3", name: "task3" },
        ];
        setTasks(taskList);

        // Uncomment below to fetch tasks from the server
        // fetch("http://localhost:8080/tasks")
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setTasks(data)
        //     });
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        const data = {
            name: newTaskName,
            deadline: deadline,
            members: members
        };
        console.log("data", data);
        fetch("http://localhost:8080/new-task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => res);

        // Clear input fields after submitting
        setNewTaskName("");
        setDeadLine("");
        setMembers([]);
    }

    const deleteTask = (id) => {
        return fetch(`http://localhost:8080/tasks/${id}`, { method: "DELETE" }).then((res) =>
            res.json()
        );
    };

    const submitDelete = (id) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete this task?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handleDelete(id)
                },
                {
                    label: 'No'
                }
            ]
        });
    }

    const handleDelete = (id) => {
        deleteTask(id);

        setTasks((taskList) => {
            return taskList.filter((task) => task._id !== id);
        });
    };

    return (
        <div className="container"> {/* Use the same class name as in your CSS */}
            <h1 className="title">Project1</h1> {/* Use the same class name as in your CSS */}
            <div className="project-list"> {/* Use the same class name as in your CSS */}
                {tasks.map((task) => (
                    <div key={task._id} className="project"> {/* Use the same class name as in your CSS */}
                        <Link to={`/project/${task.name}`}>
                            <p>{task.name}</p>
                        </Link>
                        <button type="button" onClick={() => submitDelete(task._id)}>-</button>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="new-project-form"> {/* Use the same class name as in your CSS */}
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
            </form>
        </div>
    );
}

export default Project;
