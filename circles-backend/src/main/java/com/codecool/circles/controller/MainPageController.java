package com.codecool.circles.controller;

import com.codecool.circles.model.Project;
import com.codecool.circles.service.MainPageService;
import com.codecool.circles.service.ProjectService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projectlist")
public class MainPageController {
    private ProjectService projectService;
    private MainPageService mainPageService;

    @Data
    private static class RequestData{
        private String memberId;
        private String leader;
    }
@Autowired
    public MainPageController(ProjectService projectService, MainPageService mainPageService) {
    this.projectService = projectService;
    this.mainPageService = mainPageService;
    }

    @GetMapping("/projects/{leader}")
    public List<Project> getProjects(@PathVariable String leader) {
        //List<Project> projects = mainPageService.getProjects(leader);

        return mainPageService.getOwnedProjects(leader);
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
}
