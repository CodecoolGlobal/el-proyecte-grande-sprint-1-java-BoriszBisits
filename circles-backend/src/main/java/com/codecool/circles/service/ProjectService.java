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

@Autowired
    public ProjectService(ProjectDao projectDao) {
        this.projectDao = projectDao;

    }



    public Project  getProjectById(Long projectId){
    return projectDao.getProjectById(projectId);
    }
    public List<Task>getAllTaskts(Long projectId){
        System.out.println("service" + projectId);
    return projectDao.getAllTasks(projectId);
    }



}
