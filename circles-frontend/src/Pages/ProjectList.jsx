import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    AppBar,
    Box,
    Container,
    Typography,
    IconButton,
    TextField,
    Button,
    Paper,
    Grid,
    List,
    ListItem,
    ListItemText,
    Pagination,
} from "@mui/material";
import {styled} from "@mui/material/styles";
import HeaderBar from "../Components/HeaderBar";


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

const StyledAddMembersButton = styled(Button)({
    marginBottom: "20px",
    float: "right",
});

const StyledContainer = styled(Container)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    marginTop: "20px",
    marginBottom: "50px",
    textAlign: "center",
});

const StyledGrid = styled(Grid)({
    display: "flex", justifyContent: "center", flexWrap: "wrap",
});

const StyledLeftPanel = styled(Container)({
    flex: "0 0 calc(50% - 8px)",
    marginRight: "16px",
    marginBottom: "20px", display: "flex", flexDirection: "column", alignItems: "flex-start",
});

const StyledRightPanel = styled(Container)({
    flex: "0 0 calc(50% - 8px)",
    marginBottom: "20px", display: "flex", flexDirection: "column", alignItems: "flex-start",
});

const StyledHeader = styled(Typography)({
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "left",
});

const StyledForm = styled("form")({
    display: "flex", flexDirection: "column", alignItems: "flex-start",
});

const StyledInput = styled(TextField)({
    marginBottom: "8px",
});

const StyledButton = styled(Button)({
    marginBottom: "20px",
});

const StyledPaper = styled(Paper)({
    cursor: "pointer",
    padding: "20px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100px",
    textAlign: "center",
    fontSize: "20px",
});

function ProjectList() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState("");
    const [membersName, setMembersName] = useState([]);
    const [allMembers, setAllMembers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredMembers, setFilteredMembers] = useState([]);
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

    useEffect(() => {
        fetchProjects();
        fetchMembers();
    }, []);

    function fetchProjects() {
        const token = localStorage.getItem('token');
        const leader = localStorage.getItem('username')

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        fetch(`/api/projectlist/projects/${leader}`, {
            method: 'GET', headers: headers
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch projects");
                }
                return res.json();
            })
            .then((data) => {
                setProjects(data);
            })
            .catch((error) => {
                console.error("Error fetching projects:", error);
            });
    }

    function fetchMembers() {
        const token = localStorage.getItem('token');

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        fetch("/api/projectlist/project/members", {
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
            })
            .catch((error) => {
                console.error("Error fetching members:", error);
            });
    }

    function handleSubmit(e) {
        e.preventDefault();
        let leader = localStorage.getItem('username')
        const users = membersName.map((name) => ({name}));
        const data = {
            name: newProject, members: users, leader: leader,
        };
        console.log("leader" + data.leader)

        let token = localStorage.getItem('token')
        fetch("/api/projectlist/newprojects", {
            method: "POST", headers: {
                'Authorization': `Bearer ${token}`,

                "Content-Type": "application/json",
            }, body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.ok) {
                    setNewProject("");
                    fetchProjects();
                }
            })
            .catch((error) => {
                console.error("Error creating project:", error);
            });
    }

    function handleAddCoworker(memberId) {
        let data = {
            memberId: memberId, leader: localStorage.getItem('username')
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

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredMembers.length / membersPerPage); i++) {
        pageNumbers.push(i);
    }
    return (<div style={{backgroundColor: '#f5f5f5'}}>
        <HeaderBar/>
        <StyledContainer>
            <StyledLeftPanel>
                <StyledHeader variant="h4">Create New Project:</StyledHeader>
                <StyledForm onSubmit={handleSubmit}>
                    <StyledInput
                        variant="outlined"
                        label="Project title"
                        type="text"
                        id="name"
                        value={newProject}
                        onChange={(e) => setNewProject(e.target.value)}
                    />
                    {membersName.map((data, i) => (<StyledInput
                        type="search"
                        key={i}
                        onChange={(e) => handleChange(e, i)}
                        placeholder={`Member ${i + 1}`}
                    />))}
                    <StyledButton variant="contained" color="primary" type="submit">
                        Create Project
                    </StyledButton>
                </StyledForm>
            </StyledLeftPanel>
            <StyledRightPanel>
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
                            setEventCount((old) => old + 1);
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
            <Pagination
                count={Math.ceil(filteredMembers.length / membersPerPage)}
                page={currentPage}
                onChange={(event, page) => setCurrentPage(page)}
                variant="outlined"
                shape="rounded"
                color="primary"
            />
        </StyledRightPanel>
    </StyledContainer>
        <StyledGrid container spacing={3}>
            {projects.map((project, index) => (<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <StyledPaper onClick={() => navigate(`/project/${project.id}`)}>
                    {project.name}
                </StyledPaper>
            </Grid>))}
        </StyledGrid>
    </div>);
}

export default ProjectList;
