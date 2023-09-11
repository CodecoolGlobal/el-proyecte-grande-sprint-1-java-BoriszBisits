package com.codecool.circles.controller;

import com.codecool.circles.model.SubTask;
import com.codecool.circles.model.Task;
import com.codecool.circles.service.ProjectService;
import com.codecool.circles.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

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

        System.out.println("user" + task.getMembers());

        projectService.addNewTask(task);
        return new ResponseEntity<>("result successful result",
                HttpStatus.OK);

    }

    @DeleteMapping("projectByid/{projectId}/task/{taskId}")
    public ResponseEntity<Object> deleteTask(
            @PathVariable Long projectId,
            @PathVariable Long taskId
    ) {
        boolean removed = taskService.deleteTaskById(projectId, taskId);

        if (removed) {
            return new ResponseEntity<>("Task deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Task not found", HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping("/projectByid/{projectId}/task/{taskId}")
    public Task getATaskById(@PathVariable String projectId, @PathVariable String taskId) {

        System.out.println("project ID: " + projectId);
        System.out.println("task ID: " + taskId);


        Task clg = taskService.getTaskByIds(Long.valueOf(taskId), Long.valueOf(projectId));
       List<SubTask> clgsub= clg.getSubTaskList();
       for (SubTask subTask:clgsub){
           System.out.println(subTask.getName());
       }

        return clg;
    }


    @PostMapping("projectByid/{id}/task/{taskId}/addSubTasks")
    public ResponseEntity<Object> addNewSubTasks(@PathVariable Long id, @PathVariable Long taskId, @RequestBody SubTask subTask) {

        System.out.println("subtaskname " + subTask.getName());
        System.out.println("descirtion" +  subTask.getDescription());
        System.out.println("users" + subTask.getMemberList());
//        System.out.println("subtask1" + subTasks.get(0).getName());
//        System.out.println("subtask1" + subTasks.get(1).getName());
//        System.out.println("description" + subTasks.get(0).getDescription());
//        System.out.println("users" + subTasks.get(0).getUserList().get(0).getName());
       taskService.getTaskByIds(taskId,id).addSubTask(subTask);

        return new ResponseEntity<>("Sub-tasks added successfully", HttpStatus.OK);
    }



}
