import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import TaskCircle from '../Circle/TaskCircle';
import {
    Container,
    Typography,
    IconButton,
    TextField,
    Button,
    Paper,
    Grid,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemText,
    MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import HeaderBar from '../Components/HeaderBar';

const StyledContainer = styled(Container)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    marginBottom: '50px',
    textAlign: 'center',
});

const StyledLeftColumn = styled(Grid)({
    flex: '0 0 calc(70% - 8px)',
    marginRight: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
});

const StyledRightColumn = styled(Grid)({
    flex: '0 0 calc(30% - 8px)',
    marginBottom: '20px',
});

const StyledTitle = styled(Typography)({
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'left',
});

const StyledTaskList = styled(List)({
    padding: 0,
});

const StyledTaskItem = styled(ListItem)({
    marginBottom: '20px',
});

const StyledTaskCard = styled(Card)({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
});

const StyledTaskCardContent = styled(CardContent)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
});

const StyledTaskText = styled(ListItemText)({
    fontSize: '16px',
    textDecoration: 'none',
    '& a': {
        textDecoration: 'none',
        color: 'inherit',
    },
    margin: '5px',
});

const StyledAddTaskButton = styled(Button)({
    marginBottom: '20px',
});

const StyledForm = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
});

const StyledInput = styled(TextField)({
    marginBottom: '8px',
});

const StyledButton = styled(Button)({
    marginBottom: '20px',
});

function Project() {
    const { id } = useParams();
    const [newTaskName, setNewTaskName] = useState('');
    const [tasks, setTasks] = useState([]);
    const [deadline, setDeadline] = useState('');
    const [colorOfCircle, setColorOfCircle] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [members, setMembers] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const fetchTasks = () => {
        const token = localStorage.getItem('token');

        fetch(`/api/projectlist/projectByid/${id}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
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
            headers: { Authorization: `Bearer ${token}` },
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
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                setMembers(data);
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
        const users = selectedMembers.map((memberId) => ({ id: memberId }));

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
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) => {
            if (res.ok) {
                setNewTaskName('');
                setDeadline('');
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
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json());
    };

    return (
        <div>
            <HeaderBar />
            <StyledContainer>
                <StyledLeftColumn>
                    <StyledTitle variant="h4">My Project Tasks</StyledTitle>
                    <StyledTaskList>
                        {tasks.map((task) => (
                            <StyledTaskItem key={task.id}>
                                <StyledTaskCard>
                                    <StyledTaskCardContent>
                                        <StyledTaskText>
                                            <Link to={`/project/${id}/task/${task.id}`}>{task.name}</Link>
                                        </StyledTaskText>
                                        <Button
                                            onClick={() => submitDelete(task.id)}
                                            variant="contained"
                                            color="primary"
                                        >
                                            Delete
                                        </Button>
                                    </StyledTaskCardContent>
                                </StyledTaskCard>
                            </StyledTaskItem>
                        ))}
                    </StyledTaskList>
                    <StyledAddTaskButton
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={() => setIsFormVisible(!isFormVisible)}
                    >
                        {isFormVisible ? 'Hide Form' : 'Add Task'}
                    </StyledAddTaskButton>
                    {isFormVisible && (
                        <StyledForm onSubmit={handleSubmit}>
                            <StyledInput
                                variant="outlined"
                                label="Name"
                                type="text"
                                value={newTaskName}
                                onChange={(e) => setNewTaskName(e.target.value)}
                            />
                            <StyledInput
                                variant="outlined"
                                label="Deadline"
                                type="text"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                            />
                            <StyledInput
                                variant="outlined"
                                label="Color"
                                type="text"
                                value={colorOfCircle}
                                onChange={(e) => setColorOfCircle(e.target.value)}
                            />
                            <StyledInput
                                variant="outlined"
                                label="Add Members"
                                select
                                SelectProps={{
                                    multiple: true,
                                    value: selectedMembers,
                                    onChange: (e) =>
                                        setSelectedMembers(
                                            Array.from(
                                                e.target.selectedOptions,
                                                (option) => option.value
                                            )
                                        ),
                                }}
                            >
                                {members.map((member) => (
                                    <MenuItem key={member.id} value={member.id}>
                                        {member.name}
                                    </MenuItem>
                                ))}
                            </StyledInput>
                            <StyledButton variant="contained" color="primary" type="submit">
                                Add new task
                            </StyledButton>
                        </StyledForm>
                    )}
                </StyledLeftColumn>
                <StyledRightColumn>
                    <TaskCircle projectId={id} tasks={tasks} />
                </StyledRightColumn>
            </StyledContainer>
        </div>
    );
}

export default Project;
