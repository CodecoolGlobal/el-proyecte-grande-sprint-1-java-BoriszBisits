package com.codecool.circles.service;

import com.codecool.circles.model.Note;
import com.codecool.circles.service.dao.MemberDao;
import com.codecool.circles.service.dao.NoteDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service

public class NoteService {
    public NoteDao noteDao;
    public MemberDao memberDao;
    @Autowired
    public NoteService(NoteDao noteDao, MemberDao memberDao) {
        this.noteDao = noteDao;
        this.memberDao = memberDao;
    }




    public void addNewNote(String senderName,String reciverName,String massege){
        Note note=new Note();
        note.setDate(LocalDate.now());
        note.setSender(memberDao.findMemberByName(senderName));
        note.setReciverMember(memberDao.findMemberByName(reciverName));
        note.setMassege(massege);
        noteDao.addNote(note);
    }
    public List<Note>getAllNotes(){
       return noteDao.getAllNotes();
    }
}
