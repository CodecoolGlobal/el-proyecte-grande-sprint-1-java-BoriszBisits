import React from 'react';
import { Pie } from 'react-chartjs-2';
import { ArcElement, Chart } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import './Circle.css'; // Import the CSS for styling (create a TaskCircle.css file)

Chart.register(ArcElement);

const SubTaskCircle = ({ subtasks, projectId, taskId }) => {
    const navigate = useNavigate();
    console.log(subtasks)
    if (!subtasks || subtasks.length === 0) {
        // Handle the case of empty subtasks
        return <div>No subtasks available.</div>;
    }

    const data = {
        labels: subtasks.map((subtask) => subtask.name),
        datasets: [
            {
                data: subtasks.map(() => 1),
                backgroundColor: subtasks.map((subtask) => subtask.colorOfCircle),
            },
        ],
    };

    const options = {
        responsive: true,
        onClick: (_, activeElements) => {
            if (activeElements && activeElements.length > 0) {
                const clickedSubTask = subtasks[activeElements[0].index];
                navigate(`/project/${projectId}/task/${taskId}/subtask/${clickedSubTask.id}`);
            }
        },
        plugins: {
            labels: {
                render: 'label',
                fontColor: '#fff',
            },
        },
    };

    return (
        <div className="circle-chart-container">
            <Pie data={data} options={options} />
        </div>
    );
};

export default SubTaskCircle;
