import React, { useState, useEffect } from 'react';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
  

      fetchNotes();
  }, []); 



  function fetchNotes(){
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
        console.log(data)
      setNotes(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error saving interest:", error);
    });}
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Notes List</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{"uzenet    "+note.massege}{"datum    "+note.date}{"kuldo     "   +note.sender.name}</li>
          
          
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
