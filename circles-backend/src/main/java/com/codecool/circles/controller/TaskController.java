package com.codecool.circles.controller;

import com.codecool.circles.model.Member;
import com.codecool.circles.model.SubTask;
import com.codecool.circles.model.Task;
import com.codecool.circles.service.MainPageService;
import com.codecool.circles.service.ProjectService;
import com.codecool.circles.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/")
public class TaskController {
    ProjectService projectService;
    TaskService taskService;
    MainPageService mainPageService;


    @Autowired
    public TaskController(ProjectService projectService, TaskService taskService, MainPageService mainPageService) {
        this.projectService = projectService;
        this.taskService = taskService;
        this.mainPageService = mainPageService;
    }


    @GetMapping("/project/coworkers")
    public List<Member> getMembers() {
        return mainPageService.getALLMemberWoIsCoworker();
    }


    @PostMapping("/{id}/new-task")
    public ResponseEntity<Object> addNewTaskToProject(@PathVariable Long id, @RequestBody Task task) {
       // System.out.println("date controller: " + task.getDeadLine());
        List<Member> memberList=task.getMembers();
        for (Member member:memberList){

            System.out.println("bejövök new task member id"+member.getId());
        }
        taskService.addNewTask(task, id);

        return new ResponseEntity<>("result successful result",
                HttpStatus.OK);

    }

    @DeleteMapping("projectByid/{projectId}/task/{taskId}")
    public ResponseEntity<String> deleteTask(
            @PathVariable Long projectId,
            @PathVariable Long taskId
    ) {
        ResponseEntity<String> response = taskService.deleteTaskById(taskId);
        return response;
    }

    @GetMapping("/projectByid/{projectId}/task/{taskId}")
    public Task getATaskById(@PathVariable String projectId, @PathVariable String taskId) {
        return taskService.getTaskByIds(Long.valueOf(taskId));
    }

    @GetMapping("project/members")
    public List<Member> getCoworkers(){
        return taskService.getCoworkers();
    }

    @PostMapping("projectByid/{id}/task/{taskId}/addSubTasks")
    public ResponseEntity<Object> addNewSubTasks(@PathVariable Long id, @PathVariable Long taskId, @RequestBody SubTask subTask) {

        System.out.println("subtaskname " + subTask.getName());
        System.out.println("descirtion" + subTask.getDescription());
        System.out.println("users" + subTask.getMemberList());
        taskService.addSubTaskToTaskById(taskId, subTask);

        return new ResponseEntity<>("Sub-tasks added successfully", HttpStatus.OK);
    }
}
