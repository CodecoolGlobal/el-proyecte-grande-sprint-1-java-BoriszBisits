import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

function SubTask() {

    const { id, taskId, subTaskId } = useParams();
    const [subTask, setSubTask] = useState({});

    useEffect(() => {

        fetch(`/projectByid/${id}/task/${taskId}/subtask/${subTaskId}`)
            .then((res) => res.json())
            .then((data) => {
                setSubTask(data);
            })
            .catch((error) => {
                console.error('Error fetching subtask:', error);
            });
    }, [id, taskId, subTaskId]);

    return (
        <div className="container">
            <h1 className="title">Subtask Details</h1>
            <div className="subtask-details">
                <h2>{subTask.name}</h2>
                <p>{subTask.description}</p>
            </div>
        </div>
    );
}

export default SubTask;
