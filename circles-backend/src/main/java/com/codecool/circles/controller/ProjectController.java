package com.codecool.circles.controller;

import com.codecool.circles.model.Member;
import com.codecool.circles.model.Project;
import com.codecool.circles.model.Task;
import com.codecool.circles.service.MainPageService;
import com.codecool.circles.service.ProjectService;
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

    @Autowired
    public ProjectController(ProjectService projectService, MainPageService mainPageService) {
        this.projectService = projectService;
        this.mainPageService = mainPageService;
    }

    @GetMapping("/projects")
    public List<Project> getProjects() {
        System.out.println("cica");
        List<Project> projects = mainPageService.getProjects();
        for (Project project : projects) {
            System.out.println(project.getName());
        }
        return mainPageService.getProjects();

    }

    @PostMapping("/newprojects")
    public ResponseEntity<Object> addNewProject(@RequestBody Project project) {
        System.out.println("project name: " + project.getName());
        System.out.println("project members" + project.getMembers());
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
    public void addMemberId(@RequestBody String id) {
        System.out.println("coworker id: " + id);
        Long longId = Long.valueOf(id);
        mainPageService.setMemberToCoWorker(longId);
    }



}
