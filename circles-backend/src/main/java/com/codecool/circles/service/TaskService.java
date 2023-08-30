package com.codecool.circles.service;

import com.codecool.circles.model.Project;
import com.codecool.circles.model.Task;
import com.codecool.circles.service.dao.ProjectDao;
import com.codecool.circles.service.dao.TaskDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {
private ProjectDao projectDao;
    @Autowired
    public TaskService(ProjectDao projectDao) {
        this.projectDao = projectDao;
    }



    public void addTask(Task task){

    }
}
