import React, { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import TaskCircle from "../Circle/TaskCircle";
import SubTaskCircle from "../Circle/SubTaskCircle";

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
                setSubTasks(task.subTaskList);
                console.log(subTasks);
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
    }, []);

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
            .then((res) => res.json())
            .then((data) => {

                setTask(data);
                setNewSubTasks([]);
            })
            .catch((error) => {
                console.error('Error adding sub-tasks:', error);
            });
    }

    return (
        <div className="container">
            <h1 className="title">{task.name}</h1>
            <div className="project-list">
                {task.subTaskList && task.subTaskList.map((subTask, i) => (
                    <div key={i} className="project">
                        <Link to={`/project/${id}/task/${task.id}/subtask/${subTask.id}`}>

                            <p>{subTask.name}</p>
                        </Link>
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