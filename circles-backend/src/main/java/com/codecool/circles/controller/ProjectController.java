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
@RequestMapping("/projectlist")
public class ProjectController {
    private ProjectService projectService;
    private MainPageService mainPageService;
@Data
    private static class RequestData{
        private String memberId;
        private String leader;
    }

    @Autowired
    public ProjectController(ProjectService projectService, MainPageService mainPageService) {
        this.projectService = projectService;
        this.mainPageService = mainPageService;
    }

    @GetMapping("/projects/{leader}")
    public List<Project> getProjects(@PathVariable String leader) {
        System.out.println("leader " + leader);
        //List<Project> projects = mainPageService.getProjects(leader);

        return mainPageService.getProjects(leader);

    }

    @PostMapping("/newprojects")
    public ResponseEntity<Object> addNewProject(@RequestBody Project project) {
        System.out.println("project name: " + project.getName());
        System.out.println("project members" + project.getMembers());
        System.out.println("project leader " + project.getLeader());
        mainPageService.addNewProjects(project);
        return new ResponseEntity<>("result successful result",
                HttpStatus.OK);
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

    @GetMapping("/project/members")
    public List<Member> getMembers() {
        return mainPageService.getAllMemberWhoIsNotCoWorker();
    }

    @PostMapping("/project/members")
    public void addMemberId(@RequestBody RequestData requestData) {
        System.out.println("memebr id "+ requestData.memberId);
        System.out.println("leader "+ requestData.leader);

        // Long longId = Long.valueOf(id);
       // mainPageService.setMemberToCoWorker(longId);
        mainPageService.setMemberToCoWorker(Long.valueOf(requestData.memberId),requestData.leader);
    }





}
