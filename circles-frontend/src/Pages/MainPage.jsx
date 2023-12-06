import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ProgressProjectCircle from "../Components/ProgressProjectCircle";
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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import {styled} from "@mui/material/styles";
import HeaderBar from "../Components/HeaderBar";
import Menu from "@mui/material/Menu";

const StyledHeader = styled(Typography)({
    fontSize: "24px", marginBottom: "20px", color: "blue",
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
    textAlign: "center",
    fontSize: "20px",
    minHeight: "100px",
})

const StyledMainContainer = styled(Container)({
    display: "flex", flexDirection: "column", marginTop: "20px", marginBottom: "50px",
});

const StyledGridContainer = styled(Grid)({
    display: "flex", justifyContent: "space-between", marginBottom: "20px",
});

const StyledButtonContainer = styled(Grid)({
    flex: "0 0 calc(50% - 8px)", marginBottom: "20px",
});

const StyledProjectsContainer = styled(Grid)({
    flex: "1",
});

const StyledTypography = styled(Typography)({
    fontSize: "20px", marginBottom: "10px", marginTop: "25px", color: "blue",
});

function ProjectList() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState("");
    const [deadLine, setDeadline] = useState("");
    const [projectTypes, setProjectTypes] = useState([]);
    const [selectedProjectType, setSelectedProjectType] = useState("");
    const [projectsWhereIWork, setProjectsWhereIWork] = useState([])
    const [deadlineError, setDeadlineError] = useState(null);

    useEffect(() => {
        fetchProjects();
        fetchProjectTypes();
        fetchProjectsWhatIWorkOn()
    }, []);

    function fetchProjectTypes() {
        const token = localStorage.getItem("token");
        const leader = localStorage.getItem("username");
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        fetch(`/api/profile/types`, {
            method: "GET", headers: headers,
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch projects");
                }
                return res.json();
            })
            .then((data) => {
                setProjectTypes(data);
            })
            .catch((error) => {
                console.error("Error fetching projects:", error);
            });
    }

    function fetchProjectsWhatIWorkOn() {
        const token = localStorage.getItem("token");
        const worker = localStorage.getItem("username");
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        fetch(`/api/projectlist/projects/${worker}`, {
            method: "GET", headers: headers,
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch projects");
                }
                return res.json();
            })
            .then((data) => {
                setProjectsWhereIWork(data);
            })
            .catch((error) => {
                console.error("Error fetching projects:", error);
            });
    }

    function fetchProjects() {
        const token = localStorage.getItem("token");
        const leader = localStorage.getItem("username");
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        fetch(`/api/projectlist/owned-projects/${leader}`, {
            method: "GET", headers: headers,
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
        } else if (deadlineDate <= currentDate) {
            setDeadlineError("Invalid deadline")
        } else {
            setDeadlineError(null);
            console.log("Valid deadline. Proceeding with submission.");
            handleSubmit(e);
        }
    }

    function dateCompare(incDate) {
        let projectdate = new Date(incDate)
        console.log(projectdate)
        if (new Date < projectdate) {
            return true;
        }
        return false;
    }

    function handleSubmit(e) {
        e.preventDefault();
        let leader = localStorage.getItem("username");
        const data = {
            name: newProject, leader: leader, type: selectedProjectType, deadLine: deadLine
        };
        let token = localStorage.getItem("token");

        fetch("/api/projectlist/newprojects", {
            method: "POST", headers: {
                Authorization: `Bearer ${token}`, "Content-Type": "application/json",
            }, body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.ok) {
                    setNewProject("");
                    setDeadline("")
                    fetchProjects();
                }
            })
            .catch((error) => {
                console.error("Error creating project:", error);
            });
    }

    const submitDelete = (projectId) => {
        confirmAlert({
            title: 'Confirm to delete', message: 'Are you sure to delete this task?', buttons: [{
                label: 'Yes', onClick: () => handleDelete(projectId),
            }, {
                label: 'No',
            },],
        });
    };

    const handleDelete = (projectId) => {
        deleteProject(projectId);

        setProjects((projects) => {
            return projects.filter((project) => project.id !== projectId);
        });
    };

    const deleteProject = (projectId) => {
        const token = localStorage.getItem('token');
        return fetch(`/api/projectlist/projectByid/${projectId}`, {
            method: 'DELETE', headers: {
                Authorization: `Bearer ${token}`, 'Content-Type': 'application/json',
            },
        }).then((res) => res.json());
    };

    return (<div style={{backgroundColor: "#f5f5f5"}}>
        <HeaderBar/>
        <StyledMainContainer>
            <StyledGridContainer container spacing={3}>
                <StyledButtonContainer item>
                    <StyledHeader variant="button">Create New Project</StyledHeader>
                    <StyledForm onSubmit={checkDeadlineIsValid}>
                        <StyledInput
                            variant="outlined"
                            label="Project title"
                            type="text"
                            id="name"
                            value={newProject}
                            onChange={(e) => setNewProject(e.target.value)}
                        />
                        <StyledInput
                            variant="outlined"
                            label="Deadline"
                            type="text"
                            id="deadLine"
                            value={deadLine}
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                        <FormControl variant="outlined" style={{marginBottom: "8px"}}>
                            <InputLabel id="project-type-label">Project Type</InputLabel>
                            <Select
                                labelId="project-type-label"
                                id="project-type"
                                value={selectedProjectType}
                                onChange={(e) => setSelectedProjectType(e.target.value)}
                                label="Project Type"
                                style={{minWidth: "150px"}}
                            >
                                {projectTypes.map((type, i) => (<MenuItem key={i} value={type.name}>
                                    {type.name}
                                </MenuItem>))}
                            </Select>
                        </FormControl>
                        {deadlineError && <div style={{color: 'red'}}>{deadlineError}</div>}
                        <StyledButton variant="contained" color="primary" type="submit">
                            Create Project
                        </StyledButton>
                    </StyledForm>
                </StyledButtonContainer>

                <StyledProjectsContainer container spacing={3}>
                    <Grid item xs={12}>
                        <StyledTypography variant="overline" style={{marginBottom: "20px"}}>My
                            Projects</StyledTypography>
                        <Grid container spacing={3}>
                            {projects.length == 0 ? <Grid item xs={12} sm={6} md={4} lg={3}>
                                <StyledPaper>
                                    No Current Projects
                                </StyledPaper>
                            </Grid> : projects.map((project, index) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                    <StyledPaper onClick={() => navigate(`/project/${project.id}`)}>
                                        {project.name} {project.completed ? "(Completed)" : ""}{dateCompare(project.deadLine) ? "" : "Project ended"}            </StyledPaper>
                                    <Button
                                        onClick={() => submitDelete(project.id)}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Delete
                                    </Button>
                                </Grid>))}
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <StyledTypography variant="overline">Shared Projects</StyledTypography>
                        <Grid container spacing={3}>
                            {projectsWhereIWork.length == 0 ? <Grid item xs={12} sm={6} md={4} lg={3}>
                                <StyledPaper>
                                    No Current Projects
                                </StyledPaper>
                            </Grid> : projectsWhereIWork.map((project, index) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                    <StyledPaper onClick={() => navigate(`/project/${project.id}`)}>
                                        {project.name}
                                        <> </>
                                        {project.type}
                                    </StyledPaper>
                                </Grid>))}
                        </Grid>
                    </Grid>
                </StyledProjectsContainer>
            </StyledGridContainer>
        </StyledMainContainer>

        <div className="w-30">
            <ProgressProjectCircle projects={projects}/>
        </div>
    </div>);
}

export default ProjectList;
