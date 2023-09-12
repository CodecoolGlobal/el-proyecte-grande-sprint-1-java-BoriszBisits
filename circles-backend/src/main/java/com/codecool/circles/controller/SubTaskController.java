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

    private TaskService taskService;

    @Autowired
    public SubTaskController( TaskService taskService) {

        this.taskService = taskService;
    }


    @GetMapping("/projectByid/{projectId}/task/{taskId}/subTask/{subTaskId}")
    public SubTask getSubTaskById(@PathVariable String projectId, @PathVariable String taskId, @PathVariable String subTaskId){

        System.out.println("Aproject ID: " + projectId);
        System.out.println("Btask ID: " + taskId);
        System.out.println("subtask ID: " + subTaskId);

        return taskService.getTaskByIds(UUID.fromString(taskId), UUID.fromString(projectId)).getSubTaskById(UUID.fromString(subTaskId));
    }
    @DeleteMapping("projectByid/{projectId}/task/{taskId}/subTask/{subTaskId}")
    public ResponseEntity<Object> deleteSubTask(
            @PathVariable UUID projectId,
            @PathVariable UUID taskId,
            @PathVariable UUID subTaskId
    ) {
        boolean removed = taskService.deleteSUbTaskById(projectId, taskId, subTaskId );

        if (removed) {
            return new ResponseEntity<>("Task deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Task not found", HttpStatus.NOT_FOUND);
        }

    }

}
