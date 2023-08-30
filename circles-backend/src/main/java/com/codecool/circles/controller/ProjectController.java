package com.codecool.circles.controller;


import com.codecool.circles.model.Project;
import com.codecool.circles.model.Task;
import com.codecool.circles.model.storage.Storage;
import com.codecool.circles.service.MainPageService;
import com.codecool.circles.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/")
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

        return mainPageService.getProjects();
    }

    @PostMapping("/newprojects")
    public ResponseEntity<Object> addNewProject(@RequestBody String projectName) {
        mainPageService.addNewProjects(projectName);
        return new ResponseEntity<>("result successful result",
                HttpStatus.OK);

    }

    @GetMapping("/projectByid/{projectId}")
    public List<Task> getProjectById(@PathVariable String projectId) {
        System.out.println("Received request for project ID: " + projectId);

        UUID projectUUID;
        try {
            projectUUID = UUID.fromString(projectId);
        } catch (IllegalArgumentException e) {
            System.err.println("Invalid UUID format: " + projectId);
            // Handle the error, return an error response, etc.
            return Collections.emptyList(); // or some other response
        }

        System.out.println("Parsed UUID: " + projectUUID);



        return projectService.getAllTaskts(projectUUID);
    }







}
