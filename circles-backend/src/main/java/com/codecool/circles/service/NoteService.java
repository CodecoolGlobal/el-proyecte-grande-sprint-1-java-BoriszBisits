package com.codecool.circles.service;

import com.codecool.circles.model.Note;
import com.codecool.circles.service.dao.MemberDao;
import com.codecool.circles.service.dao.NoteDao;
import com.codecool.circles.service.dao.ProjectDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service

public class NoteService {
    public NoteDao noteDao;
    public MemberDao memberDao;
    public ProjectDao projectDao;
    @Autowired

    public NoteService(NoteDao noteDao, MemberDao memberDao, ProjectDao projectDao) {
        this.noteDao = noteDao;
        this.memberDao = memberDao;
        this.projectDao = projectDao;
    }



   public List<Note>getNotesOfMemberByName(String leader){
        Long memberId=memberDao.findMemberByName(leader).getId();
        List<Note>notes=noteDao.getAllNotes();
        List<Note> filteredNotes=new ArrayList<>();
        for (Note note:notes){
            System.out.println("note.getReciverMember().getId()"+note.getReciverMember().getId());
            System.out.println("memberId"+memberId);
            if (note.getReciverMember().getId().equals(memberId)){
                filteredNotes.add(note);
            }
        }
        return filteredNotes;
    }

    public List<Note> getNotesOfProjectByProjectId(Long id){
        List<Note>notes=noteDao.getAllNotes();
        for (Note note:notes){
            System.out.println("notes of project id  "+note.getReciverProject().getId());
        }
        return notes.stream().filter(note -> note.getReciverProject().getId().equals(id)).toList();
    }




    public void addNewNoteForMembers(String senderName, String reciverName, String massege){
        Note note=new Note();
        note.setDate(LocalDate.now());
        note.setSender(memberDao.findMemberByName(senderName));
        note.setReciverMember(memberDao.findMemberByName(reciverName));
        note.setMassege(massege);
        noteDao.addNote(note);
    }
    public void addNewNoteForProject(String senderName, Long reciverProjectId, String massege){
        Note note=new Note();
        note.setDate(LocalDate.now());
        note.setSender(memberDao.findMemberByName(senderName));
        note.setReciverProject(projectDao.getProjectById(reciverProjectId));
        note.setMassege(massege);
        noteDao.addNote(note);
    }
    public List<Note>getAllNotes(){
       return noteDao.getAllNotes();
    }
}
