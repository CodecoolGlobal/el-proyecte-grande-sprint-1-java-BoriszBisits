import React, { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import TaskCircle from "../Circle/TaskCircle";
import SubTaskCircle from "../Circle/SubTaskCircle";
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


function Task() {
    const { id, taskId } = useParams();
    const [task, setTask] = useState([]);
    const [newSubTasks, setNewSubTasks] = useState([]); // State for new sub-tasks input
    const [subTasks, setSubTasks] = useState([]);
    const [subTaskName, setSubTasksName] = useState(null)
    const [description, setDescription] = useState(null)
    const [colorOfCircle, setColorOfCircle] = useState("");
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
        fetch(`/projectByid/${id}/task/${taskId}`)
            .then((res) => res.json())
            .then((data) => {
                setTask(data);
                setSubTasks(data.subTaskList);
                console.log("sub" + subTasks);
        
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
    }, []);

    function fetchSubTasks(){
        
            fetch(`/projectByid/${id}/task/${taskId}`)
                .then((res) => res.json())
                .then((data) => {
                    setTask(data);
                    setSubTasks(data.subTaskList);
            
                })
                .catch((error) => {
                    console.error('Error fetching tasks:', error);
                });
        
    }

    function handleSubmit(e) {
        e.preventDefault();

        const users = membersName.map(name => ({ name }));




        const data = {
            name: subTaskName,
            description: description,
            colorOfCircle: colorOfCircle,
            userList: users
        }


        fetch(`/projectByid/${id}/task/${taskId}/addSubTasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.ok) {
                    // Clear form fields after successful submission
                    setSubTasksName("");
                    setDescription("");
                    setColorOfCircle("")
                    setMembersName([]);
                    // Fetch updated tasks after adding a new task
                    fetchSubTasks();
    }});
            
    }

    const deleteSubTask = (subTaskId) => {
       
        return fetch(`http://localhost:8080/projectByid/${id}/task/${taskId}/subTask/${subTaskId}`, {method: "DELETE"}).then((res) =>
            res.json()
        );
    };
    const submitDelete = (subTaskId) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete this task?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handleDelete(subTaskId)
                },
                {
                    label: 'No'
                }
            ]
        });
    };

    const handleDelete = (subTaskId) => {
        deleteSubTask(subTaskId)
       
            setSubTasks((prevSubTasks) => {
                return prevSubTasks.filter((subTask) => subTask.id !== subTaskId);
            });
       
    };

    return (
        <div className="container">
            <h1 className="title">{task.name}</h1>
            <div className="project-list">
                {subTasks && subTasks.map((subTask) => (
                    <div key={subTask.id} className="project">
                        <Link to={`/project/${id}/task/${task.id}/subtask/${subTask.id}`}>

                            <p>{subTask.name}</p>
                        </Link>
                        <button type="button" onClick={() => submitDelete(subTask.id)}>Delete</button>

                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="new-subtask-form">
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={subTaskName} onChange={(e) => {
                        setSubTasksName(e.target.value)
                    }}/>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input type="text" id="description" value={description} onChange={(e) => {
                        setDescription(e.target.value)
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

                <button type="submit">Add Sub-Tasks</button>
            </form>
            <div>
                <SubTaskCircle subtasks={task.subTaskList} projectId={id} taskId={taskId}  />
            </div>
        </div>
    );
}

export default Task;