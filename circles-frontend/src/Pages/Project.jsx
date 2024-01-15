import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import TaskCircle from '../Circle/TaskCircle';
import NotesListOfProject from './NoteListOfProject';
import ProgressTaskCircle from '../Components/ProgressTaskCircle';
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
    Box,
} from '@mui/material';
import {styled} from '@mui/material/styles';
import HeaderBar from '../Components/HeaderBar';
import ProgressProjectCircle from '../Components/ProgressProjectCircle';

const StyledList = styled(List)({
    padding: 0,
});

const StyledListItem = styled(ListItem)({
    marginBottom: "8px", "&:last-child": {
        marginBottom: "20px",
    },
});

const StyledAddMembersButton = styled(Button)({
    marginBottom: "20px", float: "right",
});

const StyledListItemText = styled(ListItemText)({
    fontSize: "16px",
});

const StyledHeader = styled(Typography)({
    fontSize: "24px", marginBottom: "20px", textAlign: "left",
});

const StyledTitle = styled(Typography)({
    fontSize: '24px', marginBottom: '20px', marginLeft: '20px', textAlign: 'left', color: "blue",
});

const StyledCompletion = styled(Typography)({
    fontSize: '15px', color: 'blue', textAlign: 'center', marginTop: '8px',
});

const StyledTaskList = styled(List)({
    padding: 0,
});

const StyledTaskItem = styled(ListItem)({
    marginBottom: '20px',
});

const StyledTaskCard = styled(Card)({
    height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
});

const StyledTaskCardContent = styled(CardContent)({
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
});

const StyledTaskText = styled(ListItemText)({
    fontSize: '16px', textDecoration: 'none', '& a': {
        textDecoration: 'none', color: 'inherit',
    }, margin: '5px',
});

const StyledAddTaskButton = styled(Button)({
    marginBottom: '20px',
});

const StyledForm = styled('form')({
    display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
});

const StyledInput = styled(TextField)({
    marginBottom: '8px',
});

const StyledButton = styled(Button)({
    marginBottom: '20px',
});

function Project() {
    const {id} = useParams();
    const [newTaskName, setNewTaskName] = useState('');
    const [tasks, setTasks] = useState([]);
    const [deadline, setDeadline] = useState('');
    const [colorOfCircle, setColorOfCircle] = useState('');
    const [selectedSubtype, setSelectedSubtype] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [membersName, setMembersName] = useState([]);
    const [allMembers, setAllMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [subTypes, setSubtypes] = useState([]);
    const [scannedText, setScannedText] = useState('');
    const [notes, setNotes] = useState([])
    const [deadlineError, setDeadlineError] = useState(null);
    const [project, setProject] = useState([]);
    const [completionLevel, setCompletionLevel] = useState("");
    const [currentProject, setCurrentProject] = useState("");
    const [newDeadLine, setNewDeadLine] = useState("");


    const [eventCount, setEventCount] = useState(() => 0);
    const membersPerPage = 5;

    function handleAddMember() {
        const updatedMembers = [...membersName, ""];
        setMembersName(updatedMembers);
    }

    function handleChange(onChangeValue, i) {
        const updatedMembers = [...membersName];
        updatedMembers[i] = onChangeValue.target.value;
        setMembersName(updatedMembers);
    }

    function fetchSubtypes() {
        const token = localStorage.getItem('token');

        fetch(`/api/project/subtypes/${id}`, {
            method: 'GET', headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch subtypes");
                }
                return res.json();
            })
            .then((data) => {
                setSubtypes(data);
            })
            .catch((error) => {
                console.error("Error fetching subtypes:", error);
            });
    }

    function fetchMembers() {
        const token = localStorage.getItem('token');

        fetch(`/api/projectlist/project/members/${id}`, {
            method: 'GET', headers: {Authorization: `Bearer ${token}`},
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
            })
            .catch((error) => {
                console.error("Error fetching members:", error);
            });
    }

    const fetchTasks = () => {
        const token = localStorage.getItem('token');

        fetch(`/api/projectlist/getAllTaskByProjectId/${id}`, {
            method: 'GET', headers: {Authorization: `Bearer ${token}`},
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("tasks " + data)
                setTasks(data);
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
    };

    const fetchNotes = () => {
        const token = localStorage.getItem("token");
        const leader = localStorage.getItem("username");
        const headers = {
            Authorization: `Bearer ${token}`, "Content-Type": "application/json",
        };
        fetch(`/api/projectlist/project/message/${id}`, {
            method: "GET", headers: headers,
        })
            .then((res) => res.json())
            .then((data) => {
                setNotes(data);
            })
            .catch((error) => {
                console.error("Error fetching notes:", error);
            });
    };

    function fetchProject() {

        const token = localStorage.getItem("token");
        const leader = localStorage.getItem("username");
        const headers = {
            Authorization: `Bearer ${token}`, "Content-Type": "application/json",
        };

        fetch(`/api/projectlist/project/${id}`, {
            method: "GET", headers: headers,
        }).then((res) => {
            if (!res.ok) {
                throw new Error("Failed to fetch project")
            }
            return res.json();
        }).then((data) => {
            console.log("API Response:", data);
            setCurrentProject(data);
        })
            .catch((error) => {
                console.error("Error fetching project", error)
            })
    };

    useEffect(() => {
        fetchProject();
    }, [])

    useEffect(() => {
        fetchTasks();
        fetchMembers();
        fetchSubtypes();
        fetchNotes();

        const token = localStorage.getItem('token');

        fetch(`/api/projectlist/getAllTaskByProjectId/${id}`, {
            method: 'GET', headers: {Authorization: `Bearer ${token}`},
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("task data " + data[0].completed)
                setTasks(data);
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
    }, [id]);

    const submitDelete = (taskId) => {
        confirmAlert({
            title: 'Confirm to delete', message: 'Are you sure to delete this task?', buttons: [{
                label: 'Yes', onClick: () => handleDelete(taskId),
            }, {
                label: 'No',
            },],
        });
    };

    const handleDelete = (taskId) => {
        deleteTask(taskId);

        setTasks((tasks) => {
            return tasks.filter((task) => task.id !== taskId);
        });
    };

    function checkDeadlineIsValid(e) {

        e.preventDefault()

        const deadlineString = deadline;
        const deadlineDate = new Date(deadlineString);
        const currentDate = new Date();
        let isDeadLineStringValid = false;

        if (deadlineString[4] === "-" && deadlineString[7] === "-") {
            isDeadLineStringValid = true
        }

        if (isNaN(deadlineDate) || isDeadLineStringValid === false) {
            console.log(isDeadLineStringValid)

            setDeadlineError("The deadline format will be: yyyy-mm-dd");
        } else if (deadlineDate <= currentDate || deadlineDate > new Date(currentProject.deadLine)) {
            setDeadlineError("Invalid deadline")
        } else {
            setDeadlineError(null);
            console.log("Valid deadline. Proceeding with submission.");
            handleSubmit(e);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        console.log(selectedSubtype)
        const data = {
            name: newTaskName,
            deadLine: deadline,
            colorOfCircle: colorOfCircle,
            projectId: id,
            subtype: selectedSubtype,
        };

        fetch(`/api/${id}/new-task`, {
            method: 'POST', headers: {
                Authorization: `Bearer ${token}`, 'Content-Type': 'application/json',
            }, body: JSON.stringify(data),
        }).then((res) => {
            if (res.ok) {
                setNewTaskName('');
                setDeadline('');
                setColorOfCircle('');
                setSelectedSubtype('');
                fetchTasks();
                setIsFormVisible(false);
            }
        });
    };

    const handleScanTextSubmit = () => {
        let data = {

            leader: localStorage.getItem('username'), projectId: id, massege: scannedText,
        }
        console.log("Scanned Text:", scannedText);
        let token = localStorage.getItem('token')
        fetch("/api/projectlist/project/massege", {
            method: "POST", headers: {
                'Authorization': `Bearer ${token}`, "Content-Type": "application/json",
            }, body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.ok) {
                    fetchNotes();
                }
            })
            .catch((error) => {
                console.error("Error adding coworker:", error);
            });

        setScannedText('');
    };

    const deleteTask = (taskId) => {
        const token = localStorage.getItem('token');
        return fetch(`/api/projectByid/${id}/task/${taskId}`, {
            method: 'DELETE', headers: {
                Authorization: `Bearer ${token}`, 'Content-Type': 'application/json',
            },
        }).then((res) => res.json());
    };

    function handleAddCoworker(memberId) {
        let data = {
            memberId: memberId, leader: localStorage.getItem('username'), projectId: id
        }
        let token = localStorage.getItem('token')

        fetch("/api/projectlist/project/members", {
            method: "POST", headers: {
                'Authorization': `Bearer ${token}`, "Content-Type": "application/json",
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


    function handleSubmitCompletionLevel(e) {
        e.preventDefault();


        const token = localStorage.getItem('token');

        const data = {
            completionLevel: completionLevel
        };

        fetch(`/api/projectlist/completion-level/${id}`, {
            method: 'POST', headers: {
                Authorization: `Bearer ${token}`, 'Content-Type': 'application/json',
            }, body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.ok) {
                    setCompletionLevel("")
                }
            });
    }

    function handleSubmitNewDeadLine(e) {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const data = {
            newDeadLine: newDeadLine
        };

        fetch(`/api/projectlist/new-deadline/${id}`, {
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
        let projectdate = new Date(incDate)
        console.log(projectdate)
        if (new Date < projectdate) {
            return true;
        }
        return false;
    }

    return (dateCompare(currentProject.deadLine) ? (<div>
        <HeaderBar/>

        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            {/* title and completion level */}

                <StyledTitle variant="button">My Project Tasks </StyledTitle>
                <StyledCompletion variant="overline">
                    Level of Completion: {currentProject.levelOfCompletion}
                </StyledCompletion>
        </div>

        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <div style={{width: '25%', marginRight: '20px'}}>
                {/*Tasks*/}
                <Box>
                    {tasks.length == 0 && (<form onSubmit={handleSubmitCompletionLevel}>
                        <TextField
                            variant="outlined"
                            label="%"
                            type="text"
                            value={completionLevel}
                            onChange={(e) => setCompletionLevel(e.target.value)}
                        />
                        <Button variant="contained" color="primary" type="submit">
                            Add completion level
                        </Button>
                    </form>)}

                    <StyledTaskList>
                        {tasks.map((task) => (<StyledTaskItem key={task.id}>
                            <StyledTaskCard>
                                <StyledTaskCardContent>
                                    <StyledTaskText>
                                        <Link to={`/project/${id}/task/${task.id}`}>
                                            {task.name}
                                            {task.completed ? "(Completed)" : ""}{dateCompare(task.deadLine) ? "" : "Task ended"}
                                        </Link>
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
                        </StyledTaskItem>))}
                    </StyledTaskList>

                    <StyledAddTaskButton
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={() => setIsFormVisible(!isFormVisible)}
                    >
                        {isFormVisible ? 'Hide Form' : 'Add Task'}
                    </StyledAddTaskButton>
                    {isFormVisible && (<StyledForm onSubmit={checkDeadlineIsValid}>
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
                            label="Subtype"
                            select
                            value={selectedSubtype}
                            onChange={(e) => setSelectedSubtype(e.target.value)}
                            style={{marginBottom: '8px'}}
                        >
                            {subTypes.map((subtype) => (<MenuItem key={subtype.id} value={subtype.name}>
                                {subtype.name}
                            </MenuItem>))}
                        </StyledInput>
                        {deadlineError && <div style={{color: 'red'}}>{deadlineError}</div>}
                        <StyledButton variant="contained" color="primary" type="submit">
                            Add new task
                        </StyledButton>

                    </StyledForm>)}
                </Box>
            </div>

            {/*Members*/}
            <div style={{width: '25%', marginRight: '20px'}}>
                <Box>
                    <StyledHeader variant="h4">All Members:</StyledHeader>
                    <div className="search-bar" style={{marginBottom: "20px"}}>
                        <StyledAddMembersButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={handleAddMember}
                        >
                            Add Members
                        </StyledAddMembersButton>
                        <TextField
                            variant="outlined"
                            type="search"
                            label="Search members"
                            value={searchQuery}
                            style={{marginBottom: "20px", float: "right", marginRight: "10px"}}
                            onChange={(e) => {
                                const newSearchQuery = e.target.value;
                                setSearchQuery(newSearchQuery);
                                setFilteredMembers(filterMembers(newSearchQuery));
                            }}
                        />
                    </div>

                    <StyledList>
                        {currentMembers.map((member) => (<StyledListItem key={member.id}>
                            <StyledListItemText>{member.name}</StyledListItemText>
                            <Button
                                onClick={() => handleAddCoworker(member.id)}
                                variant="contained"
                                color="primary"
                            >
                                Add Coworker
                            </Button>
                        </StyledListItem>))}
                    </StyledList>
                </Box>
            </div>

            {/*Notes*/}
            <div style={{width: '25%', marginRight: '20px'}}>
                <Box>
                    <NotesListOfProject notes={notes}/>
                    {/*Send Note*/}
                    <StyledInput
                        variant="outlined"
                        label="Scan Text"
                        type="text"
                        value={scannedText}
                        onChange={(e) => setScannedText(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleScanTextSubmit}
                        style={{marginLeft: '10px'}}
                    >
                        Send Comment
                    </Button>
                </Box>
            </div>
        </div>

        {/*Progress Circle*/}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <div className="w-30" style={{ textAlign: 'center' }}>
                <ProgressTaskCircle tasks={tasks} />
            </div>
            {/*TaskCricle*/}
            <div style={{ textAlign: 'center' }}>
                <TaskCircle projectId={id} tasks={tasks} />
            </div>
        </div>

    </div>) : (
        <div>
        <HeaderBar/>
        <Box>
            <Typography variant="body1" align="center" gutterBottom>
                Your project deadline ended! You have to add new deadline!
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
        </Box>
    </div>));
}

export default Project;
