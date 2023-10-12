import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import TaskCircle from '../Circle/TaskCircle';
import '../Project.css';

function Project() {
    const {id} = useParams();
    const [newTaskName, setNewTaskName] = useState('');
    const [tasks, setTasks] = useState([]);
    const [deadline, setDeadLine] = useState('');
    const [colorOfCircle, setColorOfCircle] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [members, setMembers] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false); // State to control form visibility

    // Define the fetchTasks function in the outer scope
    const fetchTasks = () => {

        const token = localStorage.getItem('token');

        fetch(`/api/projectlist/projectByid/${id}`, {
            method: 'GET',
            headers: {'Authorization': `Bearer ${token}`}
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setTasks(data);
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
    };

    useEffect(() => {
        fetchTasks();

        const token = localStorage.getItem('token');

        fetch(`/api/projectlist/projectByid/${id}`, {
            method: 'GET',
            headers: {'Authorization': `Bearer ${token}`}
        })
            .then((res) => res.json())
            .then((data) => {
                setTasks(data);
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });

        fetch(`/api/project/coworkers`, {
            method: 'GET',
            headers: {'Authorization': `Bearer ${token}`}
        })
            .then((res) => res.json())
            .then((data) => {
                setMembers(data);
                console.log(data);
            })
            .catch((error) => {
                console.error('Error fetching members:', error);
            });
    }, [id]);

    const submitDelete = (taskId) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete this task?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handleDelete(taskId),
                },
                {
                    label: 'No',
                },
            ],
        });
    };

    const handleDelete = (taskId) => {
        deleteTask(taskId);

        setTasks((tasks) => {
            return tasks.filter((task) => task.id !== taskId);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const users = selectedMembers.map((memberId) => ({id: memberId}));

        const data = {
            name: newTaskName,
            deadLine: deadline,
            colorOfCircle: colorOfCircle,
            members: users,
            projectId: id,
        };

        fetch(`/api/${id}/new-task`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) => {
            if (res.ok) {
                setNewTaskName('');
                setDeadLine('');
                setSelectedMembers([]);
                fetchTasks();
                setIsFormVisible(false);
            }
        });
    };

    const deleteTask = (taskId) => {
        const token = localStorage.getItem('token');
        return fetch(`/api/projectByid/${id}/task/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json());
    };

    return (
        <div className="container">
            <div className="left-column">
                <h1 className="title">The Project</h1>
                <div className="project-list">
                    {tasks.map((task) => (
                        <div key={task._id} className="project">
                            <Link to={`/project/${id}/task/${task.id}`}>
                                <p>{task.name}</p>
                            </Link>
                            <p>Members:</p>
                            <ul>
                                {task.members.map((member) => (
                                    <li key={member.id}>{member.name}</li>
                                ))}
                            </ul>
                            <button type="button" onClick={() => submitDelete(task.id)}>
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={() => setIsFormVisible(!isFormVisible)}
                    className="add-task-button"
                >
                    {isFormVisible ? 'Hide Form' : 'Add Task'}
                </button>
                {isFormVisible && (
                    <form onSubmit={handleSubmit} className="new-project-form">
                        <div>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={newTaskName}
                                onChange={(e) => setNewTaskName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="deadline">Deadline</label>
                            <input
                                type="text"
                                id="deadline"
                                value={deadline}
                                onChange={(e) => setDeadLine(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="colorOfCircle">Color</label>
                            <input
                                type="text"
                                id="colorOfCircle"
                                value={colorOfCircle}
                                onChange={(e) => setColorOfCircle(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="add-member">Add Members</label>
                            <select
                                id="add-member"
                                multiple
                                value={selectedMembers}
                                onChange={(e) =>
                                    setSelectedMembers(Array.from(e.target.selectedOptions, (option) => option.value))
                                }
                            >
                                {members.map((member) => (
                                    <option key={member.id} value={member.id}>
                                        {member.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit">Add new task</button>
                    </form>
                )}
            </div>
            <div className="right-column">
                <div className="task-circle">
                    <TaskCircle projectId={id} tasks={tasks}/>
                </div>
            </div>
        </div>
    );
}

export default Project;
