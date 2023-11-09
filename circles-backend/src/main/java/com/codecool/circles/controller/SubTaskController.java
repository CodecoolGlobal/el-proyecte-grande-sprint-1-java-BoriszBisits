package com.codecool.circles.controller;

import com.codecool.circles.model.Member;
import com.codecool.circles.model.SubTask;
import com.codecool.circles.model.Task;
import com.codecool.circles.service.SubTaskService;
import com.codecool.circles.service.TaskService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/")
public class SubTaskController {
    private SubTaskService subTaskService;
    private TaskService taskService;


    @Data
    private static class RequestData{
        private String memberId;
        private String leader;
        private String projectId;
        private String taskId;
        private String subTaskId;
    }
    @Autowired
    public SubTaskController(SubTaskService subTaskService, TaskService taskService) {
        this.subTaskService = subTaskService;
        this.taskService = taskService;
    }

    @GetMapping("api/projectByid/{projectId}/task/{taskId}/subtask/{subTaskId}")
    public SubTask getSubTaskById(@PathVariable String projectId, @PathVariable String taskId, @PathVariable String subTaskId) {
        return taskService.getTaskByIds(Long.valueOf(taskId)).getSubTaskById(Long.valueOf(subTaskId));
    }

    @GetMapping("/api/project/coworkers/{id}/task/{taskId}/subtask/{subTaskId}")
    public List<Member> getWorkersOnSubtask(@PathVariable String id, @ PathVariable String taskId, @ PathVariable String subTaskId){
        return subTaskService.getWorkersOnSubtask(Long.valueOf(id), Long.valueOf(taskId),Long.valueOf(subTaskId));
    }

    @PostMapping("/api/subtask/members")
    public void addMemberToTask(@RequestBody RequestData requestData) {
        subTaskService.addMemberToSubtask(Long.valueOf(requestData.subTaskId), Long.valueOf(requestData.memberId));
    }
    @DeleteMapping("api/projectByid/{projectId}/task/{taskId}/subTask/{subTaskId}")
    public ResponseEntity<String> deleteSubTask(
            @PathVariable Long subTaskId
    ) {
        ResponseEntity<String> response = subTaskService.deleteSUbTaskById(subTaskId);
        return response;

    }
}
