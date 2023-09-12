package com.codecool.circles.service;

import com.codecool.circles.model.Project;
import com.codecool.circles.model.Task;
import com.codecool.circles.service.dao.ProjectDao;
import com.codecool.circles.service.dao.TaskDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class TaskService {
    private ProjectDao projectDao;
    private TaskDao taskDao;

    @Autowired

    public TaskService(ProjectDao projectDao, TaskDao taskDao) {
        this.projectDao = projectDao;
        this.taskDao = taskDao;
    }

    public Task getTaskByIds(Long taskId) {
        return taskDao.getTask(taskId);
    }

    public void addNewTask(Task task, Long id) {
        projectDao.getProjectById(id).addTask(task);

        taskDao.addTask(task);
    }

    public void deleteTaskById(Long taskId) {
        taskDao.deleteTaskById(taskId);
    }
}
