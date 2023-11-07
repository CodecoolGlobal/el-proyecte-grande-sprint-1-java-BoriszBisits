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
   


    useEffect(() => {
        fetchProjects();
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

    function handleSubmit(e) {
        e.preventDefault();
        let leader = localStorage.getItem('username')
        const data = {
            name: newProject, leader: leader,
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
                    <StyledButton variant="contained" color="primary" type="submit">
                        Create Project
                    </StyledButton>
                </StyledForm>
            </StyledLeftPanel>
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
