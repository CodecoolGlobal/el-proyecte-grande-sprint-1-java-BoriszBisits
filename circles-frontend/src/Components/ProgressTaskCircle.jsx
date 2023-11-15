import React from 'react';
import { CircularProgress, Typography } from '@mui/material';

function ProgressTaskCircle({ tasks }) {
   
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(subtask => subtask.completed).length;
 


  const percentageCompleted = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;


  return (
    <div style={{ textAlign: 'center' }}>
      <Typography variant="h6">Task Completion</Typography>
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

export default ProgressTaskCircle;
