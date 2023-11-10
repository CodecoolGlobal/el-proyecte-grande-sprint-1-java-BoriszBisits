import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
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
import { styled } from "@mui/material/styles";
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
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
});

const StyledLeftPanel = styled(Container)({
  flex: "0 0 calc(50% - 8px)",
  marginRight: "16px",
  marginBottom: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});

const StyledRightPanel = styled(Container)({
  flex: "0 0 calc(50% - 8px)",
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

const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
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
  const [projectTypes, setProjectTypes] = useState([]);
  const [selectedProjectType, setSelectedProjectType] = useState(""); // Added state for selected project type
  const [projectsWhereIWork, setProjectsWhereIWork] = useState([])

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
      method: "GET",
      headers: headers,
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
      method: "GET",
      headers: headers,
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
      method: "GET",
      headers: headers,
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
    let leader = localStorage.getItem("username");
    const data = {
      name: newProject,
      leader: leader,
      type: selectedProjectType,
    };

    console.log("Selected project type: " + selectedProjectType);

    let token = localStorage.getItem("token");
    fetch("/api/projectlist/newprojects", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
  const submitDelete = (projectId) => {
    confirmAlert({
        title: 'Confirm to delete',
        message: 'Are you sure to delete this task?',
        buttons: [
            {
                label: 'Yes',
                onClick: () => handleDelete(projectId),
            },
            {
                label: 'No',
            },
        ],
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
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
};

  return (
    <div style={{ backgroundColor: "#f5f5f5" }}>
      <HeaderBar />
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
            <FormControl variant="outlined" style={{ marginBottom: "8px" }}>
              <InputLabel id="project-type-label">Project Type</InputLabel>
              <Select
                labelId="project-type-label"
                id="project-type"
                value={selectedProjectType}
                onChange={(e) => setSelectedProjectType(e.target.value)}
              >
                {projectTypes.map((type,i) => (
                  <MenuItem key={i} value={type.name}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <StyledButton variant="contained" color="primary" type="submit">
              Create Project
            </StyledButton>
          </StyledForm>
        </StyledLeftPanel>
      </StyledContainer>
      <StyledGrid container spacing={3}>
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <StyledPaper onClick={() => navigate(`/project/${project.id}`)}>
              {project.name}
            </StyledPaper>
            <Button
                                            onClick={() => submitDelete(project.id)}
                                            variant="contained"
                                            color="primary"
                                        >
                                            Delete
                                        </Button>
          </Grid>
        ))}
      </StyledGrid>
      <StyledGrid container spacing={3}>
        {projectsWhereIWork && projectsWhereIWork.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <StyledPaper onClick={() => navigate(`/project/${project.id}`)}>
              {project.name}
              {project.type}
            </StyledPaper>
          </Grid>
        ))}
      </StyledGrid>
    </div>
  );
}

export default ProjectList;