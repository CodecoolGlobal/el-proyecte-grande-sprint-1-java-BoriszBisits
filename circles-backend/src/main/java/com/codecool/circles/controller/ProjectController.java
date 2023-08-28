package com.codecool.circles.controller;

import com.codecool.circles.model.Project;
import com.codecool.circles.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
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
            System.out.println("old" + project.getName());
        }
        return projectService.getProjects();
    }

    @PostMapping("/newprojects")
    public void addNewProject(@RequestBody String project) {
        System.out.println("new" + project);
        projectService.addNewProjects(project);
    }
}
