package com.codecool.circles.controller;

import com.codecool.circles.model.SubTask;
import com.codecool.circles.model.Task;
import com.codecool.circles.service.SubTaskService;
import com.codecool.circles.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public SubTask getSubTaskById(@PathVariable String projectId, @PathVariable String taskId, @PathVariable String subTaskId) {
        return taskService.getTaskByIds(Long.valueOf(taskId)).getSubTaskById(Long.valueOf(subTaskId));
    }

    @DeleteMapping("projectByid/{projectId}/task/{taskId}/subTask/{subTaskId}")
    public ResponseEntity<String> deleteSubTask(
            @PathVariable Long subTaskId
    ) {
        ResponseEntity<String> response = subTaskService.deleteSUbTaskById(subTaskId);
        return response;

    }
}
