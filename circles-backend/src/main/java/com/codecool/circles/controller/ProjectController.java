package com.codecool.circles.controller;

import com.codecool.circles.model.Member;
import com.codecool.circles.model.Project;
import com.codecool.circles.model.Task;
import com.codecool.circles.service.MainPageService;
import com.codecool.circles.service.ProjectService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/projectlist")
public class ProjectController {

    @Data
    private static class RequestData{
        private String memberId;
        private String leader;
        private String projectId;
    }
    private ProjectService projectService;
    private MainPageService mainPageService;


    @Autowired
    public ProjectController(ProjectService projectService, MainPageService mainPageService) {
        this.projectService = projectService;
        this.mainPageService = mainPageService;
    }

    @GetMapping("/projectByid/{projectId}")
    public List<Task> getProjectById(@PathVariable Long projectId) {

        Long projectUUID;

        try {
            projectUUID = Long.valueOf(projectId);
        } catch (IllegalArgumentException e) {
            return Collections.emptyList();
        }
        return projectService.getAllTaskByProjectId(projectUUID);
    }

    @GetMapping("/project/members/{id}")
    public List<Member> getCoWorkersByProject(@PathVariable String id) {
        System.out.println("projectIdinget " + id);
        System.out.println("workes " + mainPageService.getAllMemberWhoIsNotCoWorker(Long.valueOf(id)));
        return mainPageService.getAllMemberWhoIsNotCoWorker(Long.valueOf(id));
    }


    @PostMapping("/project/members")
    public void addMemberId(@RequestBody RequestData requestData) {
        System.out.println("memebr id "+ requestData.memberId);
        System.out.println("leader "+ requestData.leader);
        System.out.println("project id" + requestData.projectId);

        // Long longId = Long.valueOf(id);
       // mainPageService.setMemberToCoWorker(longId);
        mainPageService.setMemberToCoWorker(Long.valueOf(requestData.memberId),requestData.leader);
    }





}
