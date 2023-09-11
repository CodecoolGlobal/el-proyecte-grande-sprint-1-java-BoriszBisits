package com.codecool.circles.service;

import com.codecool.circles.model.Project;
import com.codecool.circles.model.Task;
import com.codecool.circles.service.dao.MainPageDao;
import com.codecool.circles.service.dao.ProjectDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProjectService {
   private ProjectDao projectDao;
    private MainPageDao mainPageDao;
@Autowired
    public ProjectService(ProjectDao projectDao, MainPageDao mainPageDao) {
        this.projectDao = projectDao;
        this.mainPageDao = mainPageDao;
    }

    public void addNewTask(Task task){

        projectDao.addTask(task);
    }
    public List<Task>getAllTaskts(UUID projectId){
        System.out.println("service" + projectId);
    return projectDao.getAllTasks(projectId);
    }



}
