import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import TaskCircle from '../Circle/TaskCircle';
import NotesListOfProject from './NoteListOfProject';
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

const StyledList = styled(List)({
    padding: 0,
});

const StyledListItem = styled(ListItem)({
    marginBottom: "8px",
    "&:last-child": {
        marginBottom: "20px",
    },
});

const StyledAddMembersButton = styled(Button)({
    marginBottom: "20px",
    float: "right",
});

const StyledListItemText = styled(ListItemText)({
    fontSize: "16px",
});

const StyledRightPanel = styled(Container)({
    flex: "0 0 calc(50% - 8px)",
    marginBottom: "20px", display: "flex", flexDirection: "column", alignItems: "flex-start",
});

const StyledLeftPanel = styled(Container)({
    flex: "0 0 calc(50% - 8px)",
    marginRight: "16px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
});

const StyledHeader = styled(Typography)({
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "left",
});

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
    const [selectedSubtype, setSelectedSubtype] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [membersName, setMembersName] = useState([]);
    const [allMembers, setAllMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [subTypes, setSubtypes] = useState([]);
    const [scannedText, setScannedText] = useState('');
    const [notes , setNotes]=useState([])

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
            method: 'GET',
            headers: {
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
            method: 'GET', headers: { Authorization: `Bearer ${token}` },
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
    
  const fetchNotes = () => {
    const token = localStorage.getItem("token");
    const leader = localStorage.getItem("username");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
console.log("project id in NotsListOfProject   "+id)
    fetch(`/api/projectlist/project/message/${id}`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
       // setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
        //setError("Error fetching notes. Please try again later.");
       // setLoading(false);
      });
  };

    useEffect(() => {
        fetchTasks();
        fetchMembers();
        fetchSubtypes();
        fetchNotes();

        const token = localStorage.getItem('token');

        fetch(`/api/projectlist/projectByid/${id}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setTasks(data);
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
    }, [id ]);

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

    function checkDeadlineIsValid(e) {
        const deadlineString = deadline;
        const deadlineDate = new Date(deadlineString);
        const currentDate = new Date();
    
        if (deadlineDate > currentDate ) {
            console.log("Valid deadline. Proceeding with submission.");
            handleSubmit(e);
        } else {
            console.log("Invalid deadline. Please choose a date at least one day ahead.");
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
                setColorOfCircle('');
                setSelectedSubtype(''); 
                fetchTasks();
                setIsFormVisible(false);
            }
        });
    };

    const handleScanTextSubmit = () => {
        let data = {
            
            leader: localStorage.getItem('username'),
            projectId: id,
            massege: scannedText,
        }
        console.log("Scanned Text:", scannedText);
        let  token=localStorage.getItem('token')
        fetch("/api/projectlist/project/massege", {
            method: "POST", headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
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
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json());
    };

    function handleAddCoworker(memberId) {
        let data = {
            memberId: memberId,
            leader: localStorage.getItem('username'),
            projectId: id
        }
        let token = localStorage.getItem('token')

        fetch("/api/projectlist/project/members", {
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

    return (
        <div>
            <HeaderBar />
            <StyledContainer>
                <StyledLeftPanel>
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
                            <StyledForm onSubmit={checkDeadlineIsValid}>
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
                                    style={{ marginBottom: '8px' }}
                                >
                                    {subTypes.map((subtype) => (
                                        <MenuItem key={subtype.id} value={subtype.name}>
                                            {subtype.name}
                                        </MenuItem>
                                    ))}
                                </StyledInput>
                                <StyledButton variant="contained" color="primary" type="submit">
                                    Add new task
                                </StyledButton>
                                
                            </StyledForm>
                        )}
                    </StyledLeftColumn>
                    <NotesListOfProject notes={notes}/>
                    <StyledRightColumn>
                        <TaskCircle projectId={id} tasks={tasks} />
                    </StyledRightColumn>
                </StyledLeftPanel>
                <StyledRightPanel>
                    <StyledHeader variant="h4">All Members:</StyledHeader>
                    <div className="search-bar" style={{ marginBottom: "20px" }}>
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
                            style={{ marginBottom: "20px", float: "right", marginRight: "10px" }}
                            onChange={(e) => {
                                const newSearchQuery = e.target.value;
                                setSearchQuery(newSearchQuery);
                                setFilteredMembers(filterMembers(newSearchQuery));
                            }}
                            
                        />
                    </div>
                   
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
                </StyledRightPanel>
            </StyledContainer>
            <StyledContainer>
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
                    style={{ marginLeft: '10px' }}
                >
                    Send Comment
                </Button>
            </StyledContainer>
            
        </div>
      
        
        
    );
    
}

export default Project;
