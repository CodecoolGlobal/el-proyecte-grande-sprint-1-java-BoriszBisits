import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Paper, Typography } from "@mui/material";
import HeaderBar from "../Components/HeaderBar";

function SubTask() {
    const { id, taskId, subTaskId } = useParams();
    const [subTask, setSubTask] = useState({});

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
            </Container>
        </div>
    );
}

export default SubTask;
