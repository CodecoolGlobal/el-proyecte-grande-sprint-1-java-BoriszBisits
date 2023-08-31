package com.codecool.circles.controller;

import com.codecool.circles.model.SubTask;
import com.codecool.circles.model.Task;
import com.codecool.circles.service.ProjectService;
import com.codecool.circles.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/")
public class TaskController {
    ProjectService projectService;
    TaskService taskService;

    @Autowired
    public TaskController(ProjectService projectService, TaskService taskService) {
        this.projectService = projectService;
        this.taskService = taskService;
    }


    @PostMapping("/new-task")
    public ResponseEntity<Object> addNewProject(@RequestBody Task task) {
        System.out.println(task.getName());
        //System.out.println(task.getId());
        System.out.println(task.getProjectId());
        System.out.println("user" + task.getMembers());
        System.out.println("deadline" + task.getDeadLine());
        System.out.println(task.getColorOfCircle());
        projectService.addNewTask(task);
        return new ResponseEntity<>("result successful result",
                HttpStatus.OK);

    }

    @GetMapping("/projectByid/{projectId}/task/{taskId}")
    public Task getATaskById(@PathVariable String projectId, @PathVariable String taskId) {

        System.out.println("project ID: " + projectId);
        System.out.println("task ID: " + taskId);


        Task clg = taskService.getTaskByIds(UUID.fromString(taskId), UUID.fromString(projectId));
       List<SubTask> clgsub= clg.getSubTaskList();
       for (SubTask subTask:clgsub){
           System.out.println(subTask.getName());
       }

        return clg;
    }


    @PostMapping("projectByid/{id}/task/{taskId}/addSubTasks")
    public ResponseEntity<Object> addNewSubTasks(@PathVariable UUID id, @PathVariable UUID taskId, @RequestBody List<SubTask> subTasks) {

       taskService.getTaskByIds(taskId,id).addSubTask(subTasks);

        return new ResponseEntity<>("Sub-tasks added successfully", HttpStatus.OK);
    }



}
