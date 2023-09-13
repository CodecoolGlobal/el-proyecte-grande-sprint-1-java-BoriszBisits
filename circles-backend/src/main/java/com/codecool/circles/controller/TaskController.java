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

    @PostMapping("/{id}/new-task")
    public ResponseEntity<Object> addNewTaskToProject(@PathVariable Long id, @RequestBody Task task) {
        System.out.println("date controller: " + task.getDeadLine());
        taskService.addNewTask(task, id);
        return new ResponseEntity<>("result successful result",
                HttpStatus.OK);

    }

    @DeleteMapping("projectByid/{projectId}/task/{taskId}")
    public void deleteTask(
            @PathVariable Long projectId,
            @PathVariable Long taskId
    ) {
        taskService.deleteTaskById(taskId);
    }

    @GetMapping("/projectByid/{projectId}/task/{taskId}")
    public Task getATaskById(@PathVariable String projectId, @PathVariable String taskId) {
        return taskService.getTaskByIds(Long.valueOf(taskId));
    }

    @PostMapping("projectByid/{id}/task/{taskId}/addSubTasks")
    public ResponseEntity<Object> addNewSubTasks(@PathVariable Long id, @PathVariable Long taskId, @RequestBody SubTask subTask) {

        System.out.println("subtaskname " + subTask.getName());
        System.out.println("descirtion" + subTask.getDescription());
        System.out.println("users" + subTask.getMemberList());
        taskService.getTaskByIds(taskId).addSubTask(subTask);

        return new ResponseEntity<>("Sub-tasks added successfully", HttpStatus.OK);
    }
}
