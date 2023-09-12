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
        return taskDao.getTasksByProjectId(projectId);
    }


}
