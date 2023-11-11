package com.codecool.circles.service.dao;

import com.codecool.circles.model.Note;

import java.util.List;
import java.util.UUID;

public interface NoteDao {
    public Note getNoteByUuid(UUID id);
    public void addNote(Note newNote);
public List<Note>getAllNotes();

}
