package com.codecool.circles.controller;

import com.codecool.circles.model.SubTask;
import com.codecool.circles.model.Task;
import com.codecool.circles.service.SubTaskService;
import com.codecool.circles.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.UUID;
@RestController
@RequestMapping("/")
public class SubTaskController {

    private SubTaskService subTaskService;
    private TaskService taskService;

    @Autowired
    public SubTaskController(SubTaskService subTaskService, TaskService taskService) {
        this.subTaskService = subTaskService;
        this.taskService = taskService;
    }


    @GetMapping("/projectByid/{projectId}/task/{taskId}/subtask/{subTaskId}")
    public SubTask getSubTaskById(@PathVariable String projectId, @PathVariable String taskId, @PathVariable String subTaskId){

        System.out.println("Aproject ID: " + projectId);
        System.out.println("Btask ID: " + taskId);
        System.out.println("subtask ID: " + subTaskId);

        return taskService.getTaskByIds(UUID.fromString(taskId), UUID.fromString(projectId)).getSubTaskById(UUID.fromString(subTaskId));
    }


}
