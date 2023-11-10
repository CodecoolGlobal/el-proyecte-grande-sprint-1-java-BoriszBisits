package com.codecool.circles.controller;

import com.codecool.circles.model.Project;
import com.codecool.circles.model.Task;
import com.codecool.circles.service.MainPageService;
import com.codecool.circles.service.ProjectService;
import com.codecool.circles.service.TaskService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projectlist")
public class MainPageController {
    private ProjectService projectService;
    private MainPageService mainPageService;
    private TaskService taskService;

    @Data
    private static class RequestData{
        private String memberId;
        private String leader;
        private String type;
    }
@Autowired
    public MainPageController(ProjectService projectService, MainPageService mainPageService,TaskService taskService) {
    this.projectService = projectService;
    this.mainPageService = mainPageService;
    this.taskService = taskService;
    }

    @GetMapping("/owned-projects/{leader}")
    public List<Project> getProjects(@PathVariable String leader) {
        //List<Project> projects = mainPageService.getProjects(leader);

        return mainPageService.getOwnedProjects(leader);
    }

    @GetMapping("/projects/{worker}")
    public List<Project> getProjectsWhereIamACoWorker(@PathVariable String worker) {

        System.out.println("projects what i work on " + mainPageService.getProjectsWhereIAmACoWorker(worker) );
        return mainPageService.getProjectsWhereIAmACoWorker(worker);
    }

    @PostMapping("/newprojects")
    public ResponseEntity<Object> addNewProject(@RequestBody Project project) {
        System.out.println("project name: " + project.getName());
        System.out.println("project members" + project.getMembers());
        System.out.println("project leader " + project.getLeader());
        System.out.println("project type " + project.getType());
        mainPageService.addNewProjects(project);
        return new ResponseEntity<>("result successful result",
                HttpStatus.OK);
    }
    @DeleteMapping("/projectByid/{projectId}")
    public ResponseEntity<String> deleteProject(
            @PathVariable Long projectId
    ) {
        for(Task task : projectService.getProjectById(projectId).getAllTask()){
            taskService.deleteTaskById(task.getId());
        }
        ResponseEntity<String> response = mainPageService.deleteProjectById(projectId);
        return response;
    }
}
