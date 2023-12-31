package com.codecool.circles.controller;

import com.codecool.circles.model.*;
import com.codecool.circles.service.*;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/")
public class TaskController {
    ProjectService projectService;
    TaskService taskService;
    MainPageService mainPageService;
SubTypeService subTypeService;
TypeService typeService;


    @Data
    private static class RequestData{
        private String memberId;
        private String leader;
        private String projectId;
        private String taskId;
    }

    @Data
    private static class CompletionLevelData{
        private String completionLevel;

    }

    @Data
    private static class NewDeadLineData{
        private String newDeadLine;

    }
    @Autowired

    public TaskController(ProjectService projectService, TaskService taskService, MainPageService mainPageService, SubTypeService subTypeService, TypeService typeService) {
        this.projectService = projectService;
        this.taskService = taskService;
        this.mainPageService = mainPageService;
        this.subTypeService = subTypeService;
        this.typeService = typeService;
    }











///api/project/coworkers/${id}/task/${taskId}
    @GetMapping("project/coworkers/{id}/task/{taskId}")
    public List<Member> getCoWorkers(@PathVariable String id,@ PathVariable String taskId){
        return taskService.getCoWorkers(Long.valueOf(id), Long.valueOf(taskId));
    }
    ///api/project/subtypes/{id}
    @GetMapping("project/subtypes/{id}")
    public List<SubType> getSubTypes(@PathVariable String id){
        System.out.println("------------------------Subtypeok kerese---------------------");
        System.out.println(id+"project id");
        System.out.println("subtypok-----------------------------------------------------");
        System.out.println(subTypeService.getSubtypesByProjectId(id));

        return subTypeService.getSubtypesByProjectId(id);
    }
    @PostMapping("{id}/new-task")
    public ResponseEntity<Object> addNewTaskToProject(@PathVariable Long id, @RequestBody Task task) {
        // System.out.println("date controller: " + task.getDeadLine());
        List<Member> memberList = task.getMembers();
        System.out.println("-----------------------subtype of Taskk"+task.getSubtype());
        System.out.println(task);
        for (Member member : memberList) {

            System.out.println("bejövök new task member id" + member.getId());
        }
        taskService.addNewTask(task, id);

        return new ResponseEntity<>("result successful result",
                HttpStatus.OK);
    }
    @PostMapping("/task/members")
    public void addMemberToTask(@RequestBody RequestData requestData) {

        // Long longId = Long.valueOf(id);
        // mainPageService.setMemberToCoWorker(longId);
        System.out.println("taskid " + requestData.taskId);
        System.out.println("memberiid " + requestData.memberId);
        taskService.addMemberToTask(Long.valueOf(requestData.taskId), Long.valueOf(requestData.memberId));
    }

    @DeleteMapping("projectByid/{projectId}/task/{taskId}")
    public ResponseEntity<String> deleteTask(
            @PathVariable Long projectId,
            @PathVariable Long taskId
    ) {
        ResponseEntity<String> response = taskService.deleteTaskById(taskId,projectId);
        return response;
    }

    @GetMapping("projectByid/{projectId}/task/{taskId}")
    public Task getATaskById(@PathVariable String projectId, @PathVariable String taskId) {
        return taskService.getTaskByIds(Long.valueOf(taskId));
    }

    /* @GetMapping("project/members")
     public List<Member> getCoworkers(){
         return taskService.getCoworkers();
     }
 */
    @PostMapping("projectByid/{id}/task/{taskId}/addSubTasks")
    public ResponseEntity<Object> addNewSubTasks(@PathVariable Long id, @PathVariable Long taskId, @RequestBody SubTask subTask) {

        System.out.println("subtaskname " + subTask.getName());
        System.out.println("descirtion" + subTask.getDescription());
        System.out.println("users" + subTask.getMemberList());
        taskService.addSubTaskToTaskById(taskId, subTask);

        return new ResponseEntity<>("Sub-tasks added successfully", HttpStatus.OK);
    }
    @PostMapping("task/completion-level/{taskId}")
    public void addCompletionLevel(@PathVariable Long taskId, @RequestBody CompletionLevelData requestData ) {
        taskService.addCompletionLevel(requestData.completionLevel,taskId);
    }

    @PostMapping("task/new-deadline/{id}")
    public void addNewDeadLine(@PathVariable Long id, @RequestBody NewDeadLineData newDeadLineData ) {
        taskService.addNewDeadLine(newDeadLineData.newDeadLine,id);
    }

}
