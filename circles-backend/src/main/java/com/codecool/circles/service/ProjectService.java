package com.codecool.circles.service;

import com.codecool.circles.model.Project;
import com.codecool.circles.model.Task;
import com.codecool.circles.service.dao.ProjectDao;
import com.codecool.circles.service.dao.TaskDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    private TaskDao taskDao;
    private ProjectDao projectDao;

    @Autowired
    public ProjectService(TaskDao taskDao, ProjectDao projectDao) {
        this.taskDao = taskDao;
        this.projectDao = projectDao;
    }


    public Project getProjectById(Long projectId) {
        return projectDao.getProjectById(projectId);
    }

    public List<Task> getAllTaskByProjectId(Long projectId) {
        // System.out.println("service" + projectId);
        List<Task> tasks = taskDao.getTasksByProjectId(projectId);
        System.out.println("cica1");
//        for (Task task : tasks) {
//            System.out.println("cica2");
//            task.checkCompleted();
//        }
        return tasks;
    }

    public List<Project> getAllProjects(){
        return projectDao.getAllProjects();
    }

}
