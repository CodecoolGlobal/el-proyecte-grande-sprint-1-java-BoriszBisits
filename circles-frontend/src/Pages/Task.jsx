import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TaskCircle from "../Circle/TaskCircle";
import SubTaskCircle from "../Circle/SubTaskCircle";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
    Typography,
    Container,
    Grid,
    Button,
    TextField,
    Card,
    CardContent,
    CardActions,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import HeaderBar from "../Components/HeaderBar";

const useStyles = {
    container: {
        display: 'flex',
        backgroundColor: '#f5f5f5',
    },
    leftContent: {
        flex: '0 0 70%',
        marginRight: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: '24px',
        marginBottom: '16px',
    },
    projectList: {
        listStyle: 'none',
        padding: 0,
    },
    projectCard: {
        marginBottom: '16px',
    },
    newSubtaskForm: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '16px',
    },
    formInput: {
        marginBottom: '16px',
    },
    rightContent: {
        flex: '0 0 30%',
        marginBottom: '16px',
    },
};

function Task() {
    const classes = useStyles;
    const { id, taskId } = useParams();
    const [task, setTask] = useState({});
    const [subTasks, setSubTasks] = useState([]);
    const [subTaskName, setSubTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [colorOfCircle, setColorOfCircle] = useState('');
    const [membersName, setMembersName] = useState([]);
    const navigate = useNavigate();

    const handleAddMember = () => {
        setMembersName([...membersName, '']);
    };

    const handleChange = (e, i) => {
        const updatedMembers = [...membersName];
        updatedMembers[i] = e.target.value;
        setMembersName(updatedMembers);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        fetch(`/api/projectByid/${id}/task/${taskId}`, {
            method: 'GET',
            headers: headers,
        })
            .then((res) => res.json())
            .then((data) => {
                setTask(data);
                setSubTasks(data.subTaskList);
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
    }, [id, taskId]);

    const fetchSubTasks = () => {
        const token = localStorage.getItem('token');

        fetch(`/api/projectByid/${id}/task/${taskId}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                setTask(data);
                setSubTasks(data.subTaskList);
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const users = membersName.map((name) => ({ name }));

        const token = localStorage.getItem('token');

        const data = {
            name: subTaskName,
            description: description,
            colorOfCircle: colorOfCircle,
            memberList: users,
        };

        fetch(`/api/projectByid/${id}/task/${taskId}/addSubTasks`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.ok) {
                    setSubTaskName('');
                    setDescription('');
                    setColorOfCircle('');
                    setMembersName([]);
                    fetchSubTasks();
                }
            });
    };

    const deleteSubTask = (subTaskId) => {
        const token = localStorage.getItem('token');
        return fetch(`/api/projectByid/${id}/task/${taskId}/subTask/${subTaskId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json());
    };

    const submitDelete = (subTaskId) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure to delete this task?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handleDelete(subTaskId),
                },
                {
                    label: 'No',
                },
            ],
        });
    };

    const handleDelete = (subTaskId) => {
        deleteSubTask(subTaskId);

        setSubTasks((prevSubTasks) => {
            return prevSubTasks.filter((subTask) => subTask.id !== subTaskId);
        });
    };

    return (
        <Container style={{ backgroundColor: '#f5f5f5' }}>
            <HeaderBar />
            <div className="d-flex">
                <div className="w-70">
                    <Typography variant="h4" className={classes.title}>
                        {task.name}
                    </Typography>
                    {subTasks.map((subTask) => (
                        <Card key={subTask.id} className={classes.projectCard}>
                            <CardContent>
                                <Typography variant="h6">{subTask.name}</Typography>
                                <Typography variant="body2">{subTask.description}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        navigate(`/project/${id}/task/${task.id}/subtask/${subTask.id}`)
                                    }
                                >
                                    View
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => submitDelete(subTask.id)}
                                >
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                    <form onSubmit={handleSubmit} className={classes.newSubtaskForm}>
                        <TextField
                            className={classes.formInput}
                            variant="outlined"
                            label="Name"
                            type="text"
                            value={subTaskName}
                            onChange={(e) => setSubTaskName(e.target.value)}
                        />
                        <TextField
                            className={classes.formInput}
                            variant="outlined"
                            label="Description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <TextField
                            className={classes.formInput}
                            variant="outlined"
                            label="Color"
                            type="text"
                            value={colorOfCircle}
                            onChange={(e) => setColorOfCircle(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="button"
                            onClick={handleAddMember}
                        >
                            Add Members
                        </Button>
                        {membersName.map((data, i) => (
                            <TextField
                                key={i}
                                className={classes.formInput}
                                variant="outlined"
                                label="Member"
                                type="text"
                                value={data}
                                onChange={(e) => handleChange(e, i)}
                            />
                        ))}
                        <Button variant="contained" color="primary" type="submit">
                            Add Sub-Tasks
                        </Button>
                    </form>
                </div>
                <div className="w-30">
                    <div className={classes.taskCircle}>
                        <SubTaskCircle subtasks={task.subTaskList} projectId={id} taskId={taskId} />
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Task;
