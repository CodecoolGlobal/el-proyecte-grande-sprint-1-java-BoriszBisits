package com.codecool.circles.service;

import com.codecool.circles.model.Project;
import com.codecool.circles.model.Task;
import com.codecool.circles.service.dao.ProjectDao;
import com.codecool.circles.service.dao.SubTaskDao;
import com.codecool.circles.service.dao.TaskDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class TaskService {
    private ProjectDao projectDao;
    private TaskDao taskDao;
    private SubTaskDao subTaskDao;


    @Autowired

    public TaskService(ProjectDao projectDao, TaskDao taskDao) {
        this.projectDao = projectDao;
        this.taskDao = taskDao;
    }

    public Task getTaskByIds(UUID taskId, UUID projectId) {
        return taskDao.getTask(taskId, projectId);
    }

    public boolean deleteTaskById(UUID projectId, UUID taskId) {
        return taskDao.deleteTaskById(projectId,taskId);
    }
    public boolean deleteSUbTaskById(UUID projectId, UUID taskId, UUID subTaskId) {
        return taskDao.deleteSubtaskById(projectId,taskId, subTaskId);
    }
}
