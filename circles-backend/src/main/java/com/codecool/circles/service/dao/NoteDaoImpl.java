package com.codecool.circles.service.dao;

import com.codecool.circles.model.Note;
import com.codecool.circles.repositories.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public class NoteDaoImpl implements NoteDao{
    private NoteRepository noteRepository;
@Autowired
    public NoteDaoImpl(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    @Override
    public Note getNoteByUuid(UUID id) {
        return null;
    }

    @Override
    public void addNote(Note newNote) {
       noteRepository.save(newNote);
    }

    @Override
    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }
}
