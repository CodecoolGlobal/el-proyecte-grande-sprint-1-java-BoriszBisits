import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Paper, Typography } from "@mui/material";
import HeaderBar from "../Components/HeaderBar";
import { styled } from '@mui/material/styles';
import {Button, 
       TextField,  List,
    ListItem,
    ListItemText,
}from '@mui/material';



const StyledRightPanel = styled(Container)({
    flex: "0 0 calc(50% - 8px)",
    marginBottom: "20px", display: "flex", flexDirection: "column", alignItems: "flex-start",
});
const StyledHeader = styled(Typography)({
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "left",
});

const StyledAddMembersButton = styled(Button)({
    marginBottom: "20px",
    float: "right",
});

const StyledList = styled(List)({
    padding: 0,
});
const StyledListItem = styled(ListItem)({
    marginBottom: "8px",
    "&:last-child": {
        marginBottom: "20px",
    },
});

const StyledListItemText = styled(ListItemText)({
    fontSize: "16px",
});
function SubTask() {
    const { id, taskId, subTaskId } = useParams();
    const [subTask, setSubTask] = useState({});
    const [membersName, setMembersName] = useState([]);
    const [allMembers, setAllMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
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

    function fetchMembers() {
        const token = localStorage.getItem('token');

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        fetch(`/api/project/coworkers/${id}/task/${taskId}/subtask/${subTaskId}`, {
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

    useEffect(() =>{
        fetchMembers()

    },[])

    useEffect(() => {


        const token = localStorage.getItem('token');

        fetch(`/api/projectByid/${id}/task/${taskId}/subtask/${subTaskId}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((data) => {
                setSubTask(data);
            })
            .catch((error) => {
                console.error('Error fetching subtask:', error);
            });
    }, [id, taskId, subTaskId]);

    function handleAddCoworker(memberId) {

        console.log("taskid " + taskId)
        let data = {
            memberId: memberId, leader: localStorage.getItem('username'),
            projectId: id,
            taskId: taskId,
            subTaskId: subTaskId
        }
        let token = localStorage.getItem('token')

        fetch("/api/subtask/members", {
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
        <div style={{ backgroundColor: '#f5f5f5' }}>
            <HeaderBar />
            <Container maxWidth="md" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Paper elevation={3} style={{ padding: '20px', width: '100%' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Subtask Details
                    </Typography>
                    <Typography variant="h6" align="center" gutterBottom>
                        Subtask Name: {subTask.name}
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom>
                        Descripcion: {subTask.description}
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom>
                        Level of Completion: {subTask.levelOfCompletion}
                    </Typography>
                </Paper>
                <StyledRightPanel>
                <StyledHeader variant="h4">Add Memeber:</StyledHeader>
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
                           // setEventCount((old) => old + 1);
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
            </Container>
        </div>
    );
}

export default SubTask;
