import React from 'react';
import { CircularProgress, Typography } from '@mui/material';

function ProgressProjectCircle({ projects }) {
   
  const totalProjects = projects.length;
  const completedProjects = projects.filter(project => project.completed).length;
 


  const percentageCompleted = totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0;


  return (
    <div style={{ textAlign: 'center' }}>
      <Typography variant="h6">Completion ratio</Typography>
      <CircularProgress
        variant="determinate"
        value={percentageCompleted}
        color={percentageCompleted === 100 ? 'primary' : 'secondary'}
        size={100}
        thickness={5}
      />
      <Typography variant="body2" color="textSecondary">{`${percentageCompleted.toFixed(2)}% Completed`}</Typography>
    </div>
  );
}

export default ProgressProjectCircle;
