import React from 'react';
import { CircularProgress, List, ListItem, ListItemText, Typography, Paper } from '@mui/material';
import HeaderBar from '../Components/HeaderBar';

const NotesListOfProject = ({ notes }) => {
  if (!notes) {
    return null; // Return null or handle accordingly if notes are not available
  }

  if (notes.length === 0) {
    return (
      <Paper style={{ padding: '16px', margin: '16px', textAlign: 'center' }}>
        <Typography variant="body2">No notes found.</Typography>
      </Paper>
    );
  }

  return (
    <>
      <HeaderBar />

      <Paper elevation={3} style={{ padding: '16px', margin: '16px' }}>
        <Typography variant="h5" gutterBottom>
          Notes List
        </Typography>
        <List>
          {notes.map((note) => (
            <Paper key={note.id} elevation={3} style={{ margin: '8px', padding: '16px' }}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={note.massege}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="textPrimary">
                        {`Date: ${note.date}`}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2" color="textPrimary">
                        {`Sender: ${note.sender.name}`}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            </Paper>
          ))}
        </List>
      </Paper>
    </>
  );
};

export default NotesListOfProject;
