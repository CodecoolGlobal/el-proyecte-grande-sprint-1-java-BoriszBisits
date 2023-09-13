import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import TaskCircle from "../Circle/TaskCircle";

function ProjectPage() {
    const {id} = useParams();
    const [newTaskName, setNewTaskName] = useState("");
    const [tasks, setTasks] = useState([]);
    const [deadline, setDeadLine] = useState("");
    const [colorOfCircle, setColorOfCircle] = useState("");
    const [membersName, setMembersName] = useState([]);
    const [projectName, setProjectName] = useState("");


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
        fetch(`/projectByid/${id}`)
            .then((res) => res.json())
            .then((data) => {
                //setProjectName(data); TODO
                console.log(data[0].name)
                setTasks(data);
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
    }, []);

    function fetchTasks() {
        fetch(`/projectByid/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setTasks(data);
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
    }

    function handleSubmit(e) {
        e.preventDefault();

        const users = membersName.map(name => ({ name }));

        const data = {
            name: newTaskName,
            deadLine: deadline,
            colorOfCircle: colorOfCircle,
            members: users,
            projectId: id,
        };

        fetch(`http://localhost:8080/${id}/new-task`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => {
            if (res.ok) {
                // Clear form fields after successful submission
                setNewTaskName("");
                setDeadLine("");
                setMembersName([]);
                // Fetch updated tasks after adding a new task
                fetchTasks();
            }
        });

    }

    const deleteTask = (taskId) => {
        console.log("projectid: " + id);
        console.log("taskid" + taskId);
        return fetch(`http://localhost:8080/projectByid/${id}/task/${taskId}`, {method: "DELETE"}).then((res) =>
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
        deleteTask(taskId)
        
            setTasks((tasks) => {
                return tasks.filter((task) => task.id !== taskId);
              });
    
    };
    
    return (
        <div className="container">
            <h1 className="title">The Project</h1>
            <div className="project-list">
                {tasks.map((task) => (
                    <div key={task._id} className="project">
                        <Link to={`/project/${id}/task/${task.id}`}>
                            <p>{task.name}</p>
                        </Link>
                        <button type="button" onClick={() => submitDelete(task.id)}>Delete</button>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="new-project-form">
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={newTaskName} onChange={(e) => {
                        setNewTaskName(e.target.value)
                    }}/>
                </div>
                <div>
                    <label htmlFor="deadline">Deadline</label>
                    <input type="text" id="deadline" value={deadline} onChange={(e) => {
                        setDeadLine(e.target.value)
                    }}/>
                </div>
                <div>
                    <label htmlFor="colorOfCircle">Color</label>
                    <input type="text" id="colorOfCircle" value={colorOfCircle} onChange={(e) => {
                        setColorOfCircle(e.target.value)
                    }}/>
                </div>
                <div>
                    <label htmlFor="add-member">Add Member</label>
                    <button type="button" onClick={() => handleAddMember()}>Add Members</button>
                    {membersName.map((data,i) => {
                        return(
                            <input onChange={e => handleChange(e,i)}/>
                        )
                    })}

                </div>
                <button type="submit">Add new task</button>
            </form>
            <div>
                <TaskCircle projectId={id} tasks={tasks}/>
            </div>
        </div>
    );
}

export default ProjectPage;
