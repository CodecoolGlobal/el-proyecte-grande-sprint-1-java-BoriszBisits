import React, { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';

function Task() {
    const { id, taskId } = useParams();
    const [task, setTask] = useState([]);
    const [newSubTasks, setNewSubTasks] = useState([]); // State for new sub-tasks input

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

    function handleSubmit(e) {
        e.preventDefault();

        // Create an array of new sub-tasks
        const subTasksData = newSubTasks.map(subTask => ({
            name: subTask.name,
            description: subTask.description,
        }));


        fetch(`/projectByid/${id}/task/${taskId}/addSubTasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(subTasksData),
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

    function handleSubTaskChange(index, field, value) {
        const updatedSubTasks = [...newSubTasks];
        updatedSubTasks[index] = {
            ...updatedSubTasks[index],
            [field]: value,
        };
        setNewSubTasks(updatedSubTasks);
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
                    {newSubTasks.map((subTask, index) => (
                        <div key={index}>
                            <input
                                type="text"
                                value={subTask.name || ''}
                                onChange={(e) => handleSubTaskChange(index, 'name', e.target.value)}
                                placeholder="Sub-Task Name"
                            />
                            <input
                                type="text"
                                value={subTask.description || ''}
                                onChange={(e) => handleSubTaskChange(index, 'description', e.target.value)}
                                placeholder="Sub-Task Description"
                            />
                            <input
                                type="text"
                                value={subTask.userList || ''}
                                onChange={(e) => handleSubTaskChange(index, 'userList', e.target.value)}
                                placeholder="User List"
                            />
                        </div>
                    ))}
                </div>
                <button type="button" onClick={() => setNewSubTasks([...newSubTasks, {}])}>
                    Add Another Sub-Task
                </button>
                <button type="submit">Add Sub-Tasks</button>
            </form>
        </div>
    );
}

export default Task;
