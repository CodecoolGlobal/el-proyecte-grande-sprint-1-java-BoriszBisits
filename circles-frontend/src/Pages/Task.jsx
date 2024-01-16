import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TaskCircle from "../Circle/TaskCircle";
import SubTaskCircle from "../Circle/SubTaskCircle";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ProgressCircle from '../Components/ProgressSubtaskCircle';
import {
    Typography, Container, Grid, Button, TextField, Card, CardContent, CardActions,
    List, ListItem, ListItemText,
} from '@mui/material';
import HeaderBar from "../Components/HeaderBar";
import { styled } from '@mui/material/styles';

const useStyles = {
    container: {
        display: 'flex', backgroundColor: '#f5f5f5',
    }, leftContent: {
        flex: '0 0 70%', marginRight: '16px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
    },

    title: {
        fontSize: '24px', marginBottom: '16px',
    }, projectList: {
        listStyle: 'none', padding: 0,
    }, projectCard: {
        marginBottom: '16px',
    }, newSubtaskForm: {
        display: 'flex', flexDirection: 'column', marginTop: '16px',
    }, formInput: {
        marginBottom: '16px',
    },
    rightContent: {
        flex: '0 0 30%', marginBottom: '16px',
    },
};

const StyledTitle = styled(Typography)({
    fontSize: '24px', marginBottom: '16px', textAlign: 'left',
});

const StyledCompletion = styled(Typography)({
    fontSize: '15px', color: 'blue', textAlign: 'center', marginTop: '8px',
});

const StyledAddButtonContainer = styled(Container)({
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', textAlign: 'center',
});

const StyledAddButton = styled(Button)({
    marginBottom: '20px',
});

const StyledLeftPanel = styled(Container)({
    flex: '0 0 70%', marginRight: '16px', marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
});

const StyledSubTasksContainer = styled(Container)({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    '& > div': {
        marginBottom: '20px',
    }
});

const StyledAddSubtaskContainer = styled(Container)({
    display: 'flex', flexDirection: 'column', marginTop: '16px',
    '& > form': {
        marginBottom: '10px',
    },
});

const StyledAddMembersContainer = styled(Container)({
    flex: '0 0 30%', marginBottom: '16px', display: 'flex', flexDirection: 'column',
});

const StyledAddMembersButton = styled(Button)({
    marginTop: '10px', alignSelf: 'flex-end',
});

const StyledList = styled(List)({
    padding: 0,
});

const StyledListItem = styled(ListItem)({
    marginBottom: '8px', '&:last-child': {
        marginBottom: '20px',
    },
});

const StyledListItemText = styled(ListItemText)({
    fontSize: '16px',
});

function Task() {
    const classes = useStyles;
    const { id, taskId } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({});
    const [subTasks, setSubTasks] = useState([]);
    const [subTaskName, setSubTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [colorOfCircle, setColorOfCircle] = useState('');
    const [deadLine, setDeadline] = useState('');
    const [membersName, setMembersName] = useState([]);
    const [allMembers, setAllMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [eventCount, setEventCount] = useState(() => 0);
    const [deadlineError, setDeadlineError] = useState(null);
    const [completionLevel, setCompletionLevel] = useState('');
    const [newDeadLine, setNewDeadLine] = useState('');
    const [remainingTime, setRemainingTime] = useState({
        days: 0, hours: 0, minutes: 0,
    });

    const membersPerPage = 5;

    function handleAddMember() {
        const updatedMembers = [...membersName, ""];
        setMembersName(updatedMembers);
    }

    console.log("id" + id)

    function handleChange(onChangeValue, i) {
        const updatedMembers = [...membersName];
        updatedMembers[i] = onChangeValue.target.value;
        setMembersName(updatedMembers);
    }

    function fetchMembers() {
        const token = localStorage.getItem('token');

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        fetch(`/api/project/coworkers/${id}/task/${taskId}`, {
            method: 'GET', headers: headers
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch members");
                }
                return res.json();
            })
            .then((data) => {
                data = data.filter(member => member.name !== localStorage.getItem("username"))
                setAllMembers(data);
                setFilteredMembers(data);
                console.log("all" + allMembers)
            })
            .catch((error) => {
                console.error("Error fetching members:", error);
            });
    }

    useEffect(() => {
        fetchMembers()

    }, [])

    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        fetch(`/api/projectByid/${id}/task/${taskId}`, {
            method: 'GET', headers: headers,
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Task Data:", data); // Log the entire response
                setTask(data);
                console.log("comp-level " + data.levelOfCompletion)
                setSubTasks(data.subTaskList);
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
    }, [id, taskId]);

    function calculateTimeUntilDeadline() {
        const deadlineString = task.deadLine;
        const deadlineDate = new Date(deadlineString);
        const currentDate = new Date();
        const timeDifference = deadlineDate - currentDate;

        const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setRemainingTime({
            days: daysLeft, hours: hoursLeft, minutes: minutesLeft,
        });
    }

    useEffect(() => {
        calculateTimeUntilDeadline();
        const intervalId = setInterval(() => {
            calculateTimeUntilDeadline();
        }, 60000);

        return () => clearInterval(intervalId);
    }, [task.deadLine]);

    const fetchSubTasks = () => {
        const token = localStorage.getItem('token');

        fetch(`/api/projectByid/${id}/task/${taskId}`, {
            method: 'GET', headers: {Authorization: `Bearer ${token}`},
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

    function checkDeadlineIsValid(e) {
        e.preventDefault();

        const deadlineString = deadLine;
        const deadlineDate = new Date(deadlineString);
        const currentDate = new Date();

        let isDeadLineStringValid = false;

        if (deadlineString[4] === "-" && deadlineString[7] === "-") {
            isDeadLineStringValid = true
        }

        if (isNaN(deadlineDate) || isDeadLineStringValid === false) {
            setDeadlineError("The deadline format will be: yyyy-mm-dd");
        } else if (deadlineDate <= currentDate || deadlineDate > new Date(task.deadLine)) {
            setDeadlineError("Invalid deadline")
        } else {
            setDeadlineError(null);
            console.log("Valid deadline. Proceeding with submission.");
            handleSubmit(e);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const users = membersName.map((name) => ({name}));
        const token = localStorage.getItem('token');
        const data = {
            name: subTaskName,
            description: description,
            colorOfCircle: colorOfCircle,
            memberList: users,
            deadLine: deadLine
        };

        fetch(`/api/projectByid/${id}/task/${taskId}/addSubTasks`, {
            method: 'POST', headers: {
                Authorization: `Bearer ${token}`, 'Content-Type': 'application/json',
            }, body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.ok) {
                    setSubTaskName('');
                    setDescription('');
                    setColorOfCircle('');
                    setDeadline('')
                    fetchSubTasks();
                }
            });
    };

    const deleteSubTask = (subTaskId) => {
        const token = localStorage.getItem('token');
        return fetch(`/api/projectByid/${id}/task/${taskId}/subTask/${subTaskId}`, {
            method: 'DELETE', headers: {
                Authorization: `Bearer ${token}`, 'Content-Type': 'application/json',
            },
        }).then((res) => res.json());
    };

    const submitDelete = (subTaskId) => {
        confirmAlert({
            title: 'Confirm to delete', message: 'Are you sure to delete this task?', buttons: [{
                label: 'Yes', onClick: () => handleDelete(subTaskId),
            }, {
                label: 'No',
            },],
        });
    };

    function handleAddCoworker(memberId) {
        let data = {
            memberId: memberId, leader: localStorage.getItem('username'), projectId: id, taskId: taskId
        }
        let token = localStorage.getItem('token')

        fetch("/api/task/members", {
            method: "POST", headers: {
                'Authorization': `Bearer ${token}`,

                "Content-Type": "application/json",
            }, body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.ok) {
                    fetchMembers();
                }
            })
            .catch((error) => {
                console.error("Error adding coworker:", error);
            });
    }

    function filterMembers(searchQuery) {
        return allMembers.filter((member) => member.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;
    const currentMembers = filteredMembers.slice(indexOfFirstMember, indexOfLastMember);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleDelete = (subTaskId) => {
        deleteSubTask(subTaskId);

        setSubTasks((prevSubTasks) => {
            return prevSubTasks.filter((subTask) => subTask.id !== subTaskId);
        });
    };

    function handleSubmitCompletionLevel(e) {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const data = {
            completionLevel: completionLevel
        };

        fetch(`/api/task/completion-level/${taskId}`, {
            method: 'POST', headers: {
                Authorization: `Bearer ${token}`, 'Content-Type': 'application/json',
            }, body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.ok) {
                    setCompletionLevel("")
                    fetchSubTasks()
                }
            });
    }

    function handleSubmitNewDeadLine(e) {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const data = {
            newDeadLine: newDeadLine
        };

        fetch(`/api/task/new-deadline/${taskId}`, {
            method: 'POST', headers: {
                Authorization: `Bearer ${token}`, 'Content-Type': 'application/json',
            }, body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.ok) {
                    setNewDeadLine("")
                }
            });
    }

    function dateCompare(incDate) {
        let taskdate = new Date(incDate)
        console.log(taskdate)
        if (new Date < taskdate) {
            return true;
        }
        return false;
    }

    return (dateCompare(task.deadLine) ? (
        <div>
            <HeaderBar />
            <Container className={classes.container}>
                {/* Top Part */}
                <StyledLeftPanel>
                    <StyledTitle variant="button" className={classes.title}>
                        {task.name}
                    </StyledTitle>
                    <StyledCompletion variant="overline">
                        Level of Completion: {task.levelOfCompletion}
                    </StyledCompletion>
                    <Typography variant="h6">
                        Time left until deadline: {remainingTime.days} days, {remainingTime.hours} hours,{' '}
                        {remainingTime.minutes} minutes
                    </Typography>
                </StyledLeftPanel>

                {/* Subtasks and Add Subtask */}
                <StyledSubTasksContainer>
                    <div className="w-70">
                        {subTasks.map((subTask) => (
                            <Card key={subTask.id} className={classes.projectCard}>
                                <CardContent>
                                    <Typography
                                        variant="h6">{subTask.name} {subTask.completed ? "(Completed)" : ""}</Typography>
                                    <Typography variant="body2">{subTask.description}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => navigate(`/project/${id}/task/${task.id}/subtask/${subTask.id}`)}
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

                        <StyledAddSubtaskContainer>
                        {subTasks.length === 0 && (
                            <form onSubmit={handleSubmitCompletionLevel} className={classes.newSubtaskForm}>
                                <TextField
                                    className={classes.formInput}
                                    variant="outlined"
                                    label="%"
                                    type="text"
                                    value={completionLevel}
                                    onChange={(e) => setCompletionLevel(e.target.value)}
                                />
                                <Button variant="contained" color="primary" type="submit">
                                    Add completion level
                                </Button>
                            </form>
                        )}

                        {/* Add Sub-Tasks form */}
                        <form onSubmit={checkDeadlineIsValid} className={classes.newSubtaskForm}>
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
                                label="Deadline"
                                type="text"
                                value={deadLine}
                                onChange={(e) => setDeadline(e.target.value)}
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
                            <Button variant="contained" color="primary" type="submit" style={{ marginBottom: '20px' }}>
                                Add Sub-Tasks
                            </Button>
                        </form>
                        </StyledAddSubtaskContainer>
                    </div>
                </StyledSubTasksContainer>

                {/* Add Members */}
                <StyledAddMembersContainer>
                    <TextField
                        variant="outlined"
                        type="search"
                        label="Search members"
                        value={searchQuery}
                        onChange={(e) => {
                            const newSearchQuery = e.target.value;
                            setSearchQuery(newSearchQuery);
                            setFilteredMembers(filterMembers(newSearchQuery));
                        }}
                    />
                    <StyledList>
                        {currentMembers.map((member) => (
                            <StyledListItem key={member.id}>
                                <StyledListItemText>{member.name}</StyledListItemText>
                                <Button
                                    onClick={() => handleAddCoworker(member.id)}
                                    variant="contained"
                                    color="primary"
                                >
                                    Add Coworker
                                </Button>
                            </StyledListItem>
                        ))}
                    </StyledList>
                    <StyledAddMembersButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleAddMember}
                    >
                        Add Members
                    </StyledAddMembersButton>
                </StyledAddMembersContainer>
            </Container>

            {/* Circles */}
            <div className="w-30">
                <div className={classes.taskCircle}>
                    <SubTaskCircle subtasks={task.subTaskList} projectId={id} taskId={taskId} />
                </div>
            </div>

            {/* Progress Circle */}
            <div className="w-30">
                <ProgressCircle subtasks={subTasks} />
            </div>
        </div>
    ) : (
        <div>
            <HeaderBar/>
                <Typography variant="body1" align="center" gutterBottom>
                    Your task deadline ended! You have to add a new deadline!
                </Typography>
                <form onSubmit={handleSubmitNewDeadLine}>
                    <TextField
                        variant="outlined"
                        label="new deadline"
                        type="text"
                        value={newDeadLine}
                        onChange={(e) => setNewDeadLine(e.target.value)}
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Add New Deadline
                    </Button>
                </form>
        </div>
    ));
}
export default Task;
