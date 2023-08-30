package com.codecool.circles.controller;

import com.codecool.circles.model.SubTask;
import com.codecool.circles.model.Task;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDate;
import java.util.UUID;

public class SubTaskController {
    @GetMapping("/projectByid/{projectId}/task/{taskId}/subtask/{subTaskId}")
    public SubTask getSubTaskById(@PathVariable String projectId, @PathVariable String taskId, @PathVariable String subTaskId){

        System.out.println("Aproject ID: " + projectId);
        System.out.println("Btask ID: " + taskId);
        System.out.println("subtask ID: " + subTaskId);

        SubTask subTask = new SubTask("name","asdasdas",null);

        return subTask;
    }


}
