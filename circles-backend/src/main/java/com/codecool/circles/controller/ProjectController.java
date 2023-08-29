package com.codecool.circles.controller;


import com.codecool.circles.model.Project;
import com.codecool.circles.model.Task;
import com.codecool.circles.service.MainPageService;
import com.codecool.circles.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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






}
