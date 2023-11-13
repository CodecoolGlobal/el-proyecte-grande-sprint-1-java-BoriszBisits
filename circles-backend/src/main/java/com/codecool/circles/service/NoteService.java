package com.codecool.circles.service;

import com.codecool.circles.model.Note;
import com.codecool.circles.service.dao.MemberDao;
import com.codecool.circles.service.dao.NoteDao;
import com.codecool.circles.service.dao.ProjectDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContextExtensionsKt;
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
       for (Note note : notes) {


           if (note.getReciverMember() != null) {

               if (note.getReciverMember().getId().equals(memberId)) {
                   filteredNotes.add(note);
               }
           } else {
               System.out.println("Receiver Member or ID is null");
               continue;
           }
       }
        return filteredNotes;
    }

    public List<Note> getNotesOfProjectByProjectId(Long id){
        List<Note>notes=noteDao.getAllNotes();
     List<Note>filteredNotes=new ArrayList<>();
        for (Note note : notes) {


            if (note.getReciverProject() != null) {

                if (note.getReciverProject().getId().equals(id)) {
                    filteredNotes.add(note);
                }
            } else {
                System.out.println("Receiver Member or ID is null");
                continue;
            }
        }
        return filteredNotes;
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
