import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function ProjectPage() {
    const { id } = useParams();
    const [newTaskName, setNewTaskName] = useState("");
    const [tasks, setTasks] = useState([]);
    const [deadline, setDeadLine] = useState("");
    const [membersName, setMembersName] = useState([]);

    function handleAddMember(){
        const abc = [...membersName,[]]
        setMembersName(abc);

    }

    function handleChange(onChangeValue, i){
        const inputdata = [...membersName]
        inputdata[i] = onChangeValue.target.value
        setMembersName(inputdata)
        
        
    }
    console.log(membersName)


    useEffect(() => {
        fetch(`/projectByid/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setTasks(data);
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
    }, [id]);



    function handleSubmit(e) {
        e.preventDefault();

        const members = membersName.map(name => ({ name }));


    console.log("members" + members)

   
        const data = {
            name: newTaskName,
            deadline: deadline,
            members : members,
            projectId: id,
        };

        console.log("data" + data)


        fetch("http://localhost:8080/new-task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => res);

       
        
    }

    const deleteTask = (taskId) => {
        return fetch(`http://localhost:8080/tasks/${taskId}`, { method: "DELETE" }).then((res) =>
            res.json()
        );
    };

    const submitDelete = (taskId) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete this task?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handleDelete(taskId)
                },
                {
                    label: 'No'
                }
            ]
        });
    };

    const handleDelete = (taskId) => {
        deleteTask(taskId);

        setTasks((taskList) => {
            return taskList.filter((task) => task._id !== taskId);
        });
    };

    return (
        <div className="container">
            <h1 className="title">Project1</h1>
            <div className="project-list">
                {tasks.map((task) => (
                    <div key={task._id} className="project">
                        <Link to={`/project/${task.name}`}>
                            <p>{task.name}</p>
                        </Link>
                        <button type="button" onClick={() => submitDelete(task._id)}>-</button>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="new-project-form">
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={newTaskName} onChange={(e) => { setNewTaskName(e.target.value) }} />
                </div>
                <div>
                    <label htmlFor="deadline">Deadline</label>
                    <input type="text" id="deadline" value={deadline} onChange={(e) => { setDeadLine(e.target.value) }} />
                </div>
                <div>
                    <button type="button" onClick={() => handleAddMember()}>Add Members</button>
                    {membersName.map((data,i) => {
                        return(
                            <input onChange={e => handleChange(e,i)}/>
                        )
                    })}
                </div>
                <button type="submit">Add new task</button>
            </form>
        </div>
    );
}

export default ProjectPage;
