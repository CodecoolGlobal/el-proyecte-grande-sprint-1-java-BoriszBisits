import React from 'react';
import { Pie } from 'react-chartjs-2';
import { ArcElement, Chart } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import './Circle.css'; // Import the CSS for styling (create a TaskCircle.css file)

Chart.register(ArcElement);

const TaskCircle = ({ tasks, projectId }) => {

    const navigate = useNavigate();

    const data = {
        labels: tasks.map((task) => task.name),
        datasets: [
            {
                data: tasks.map(() => 1),
                backgroundColor: tasks.map((task) => task.colorOfCircle),
            },
        ],
    };

    const options = {
        responsive: true,
        onClick: (_, activeElements) => {
            if (activeElements && activeElements.length > 0) {
                const clickedTask = tasks[activeElements[0].index];
                navigate(`/project/${projectId}/task/${clickedTask.id}`);
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

export default TaskCircle;
