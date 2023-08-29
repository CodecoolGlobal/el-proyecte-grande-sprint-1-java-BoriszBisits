package com.codecool.circles.controller;

import com.codecool.circles.model.Task;
import com.codecool.circles.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/")
public class TaskController {
    ProjectService projectService;

    @Autowired
    public TaskController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping("/new-task")
    public ResponseEntity<Object> addNewProject(@RequestBody Task task) {
        System.out.println(task.getName());
        //System.out.println(task.getId());
        System.out.println(task.getProjectId());
        System.out.println(task.getUsers());
        projectService.addNewTask(task);
        return new ResponseEntity<>("result successful result",
                HttpStatus.OK);

    }

    @GetMapping("/{id}/tasks")
    public List<Task> getAllTasks(@RequestParam String id) {
        System.out.println(id);
        return projectService.getAllTaskts(UUID.fromString(id));
    }

}
