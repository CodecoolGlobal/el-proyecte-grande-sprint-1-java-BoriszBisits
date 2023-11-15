package com.codecool.circles.controller;

import com.codecool.circles.model.Member;
import com.codecool.circles.model.Note;
import com.codecool.circles.model.Project;
import com.codecool.circles.model.Task;
import com.codecool.circles.service.MainPageService;
import com.codecool.circles.service.NoteService;
import com.codecool.circles.service.ProjectService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/projectlist")
public class ProjectController {

    @Data
    private static class RequestData{
        private String memberId;
        private String leader;
        private String projectId;
        private String massege;
    }
    private ProjectService projectService;
    private MainPageService mainPageService;
    private NoteService noteService;
    @Autowired

    public ProjectController(ProjectService projectService, MainPageService mainPageService, NoteService noteService) {
        this.projectService = projectService;
        this.mainPageService = mainPageService;
        this.noteService = noteService;
    }

    @GetMapping("/project/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        Long projectUUID;
        try {
            projectUUID = Long.valueOf(id);
            Project project = projectService.getProjectById(projectUUID);
            return new ResponseEntity<>(project, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/projects")
    public List<Project> getProjects(){
        return projectService.getAllProjects();
    }

    @GetMapping("/getAllTaskByProjectId/{projectId}")
    public List<Task> getAllTaskByProjectId(@PathVariable Long projectId) {

        Long projectUUID;

        try {
            projectUUID = Long.valueOf(projectId);
        } catch (IllegalArgumentException e) {
            return Collections.emptyList();
        }
        return projectService.getAllTaskByProjectId(projectUUID);
    }





    @GetMapping("/project/message/{id}")
    public List<Note> getMessagesOfMember(@PathVariable String id) {
        System.out.println("-----------------Message--------------------------");
        System.out.println("project ID in massage context " + id);


        return noteService.getNotesOfProjectByProjectId(Long.valueOf(id));
    }
//"/api/projectlist/project/massege"
@PostMapping("/project/massege")
public void addNewMassege(@RequestBody RequestData requestData) {
    System.out.println("-------------------------------------------------data in messegae context in project");
    System.out.println("------------massege"+requestData.massege);
    System.out.println("-------------leader"+requestData.leader);
    System.out.println("------------projectID"+requestData.projectId);
    noteService.addNewNoteForProject(requestData.leader,Long.valueOf(requestData.projectId), requestData.massege);
    }


    @GetMapping("/project/members/{id}")
    public List<Member> getCoWorkersByProject(@PathVariable String id) {
        System.out.println("projectIdinget " + id);
        return mainPageService.getAllMemberWhoIsNotCoWorker(Long.valueOf(id));
    }


    @PostMapping("/project/members")
    public void addMemberId(@RequestBody RequestData requestData) {
        System.out.println("memebr id "+ requestData.memberId);
        System.out.println("leader "+ requestData.leader);
        System.out.println("project id" + requestData.projectId);

        // Long longId = Long.valueOf(id);
       // mainPageService.setMemberToCoWorker(longId);
        mainPageService.setMemberToCoWorker(Long.valueOf(requestData.projectId),requestData.leader, Long.valueOf(requestData.memberId));
    }






}
