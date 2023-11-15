import React from 'react';
import { CircularProgress, Typography } from '@mui/material';

function ProgressSubtaskCircle({ subtasks }) {
  
   
  const totalSubtasks = subtasks.length;
  const completedSubtasks = subtasks.filter(subtask => subtask.completed).length;
 


  const percentageCompleted = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;


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

export default ProgressSubtaskCircle;
