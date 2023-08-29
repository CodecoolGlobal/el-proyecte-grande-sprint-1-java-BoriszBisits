package com.codecool.circles.controller;


import com.codecool.circles.model.Project;
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

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/projects")
    public List<Project> getProjects() {

        for(Project project : projectService.getProjects()){
        }
        return projectService.getProjects();
    }

    @PostMapping("/newprojects")
    public ResponseEntity<Object> addNewProject(@RequestBody String projectName) {
        projectService.addNewProjects(projectName);
        return new ResponseEntity<>("result successful result",
                HttpStatus.OK);

    }

}
