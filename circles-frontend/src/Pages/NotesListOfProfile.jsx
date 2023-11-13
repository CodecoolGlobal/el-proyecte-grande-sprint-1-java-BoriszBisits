import React, { useState, useEffect } from 'react';
import { CircularProgress, List, ListItem, ListItemText, Typography, Paper } from '@mui/material';
import HeaderBar from '../Components/HeaderBar';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    const token = localStorage.getItem("token");
    const leader = localStorage.getItem("username");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    fetch(`/api/profile/message/${leader}`, {
      method: "GET",
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
        setError("Error fetching notes. Please try again later.");
        setLoading(false);
      });
  };

  if (error) {
    return (
      <Paper style={{ padding: '16px', margin: '16px', textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Paper>
    );
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', margin: '16px' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
        <HeaderBar />

    <Paper elevation={3} style={{ padding: '16px', margin: '16px' }}>
      <Typography variant="h5" gutterBottom>
        Notes List
      </Typography>
      {notes.length === 0 ? (
        <Typography variant="body2">No notes found.</Typography>
      ) : (
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
      )}
    </Paper>
    </>

  );
};

export default NotesList;
