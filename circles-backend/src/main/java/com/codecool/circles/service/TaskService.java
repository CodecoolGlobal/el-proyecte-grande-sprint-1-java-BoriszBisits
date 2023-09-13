package com.codecool.circles.service;

import com.codecool.circles.model.Project;
import com.codecool.circles.model.SubTask;
import com.codecool.circles.model.Task;
import com.codecool.circles.service.dao.ProjectDao;
import com.codecool.circles.service.dao.SubTaskDao;
import com.codecool.circles.service.dao.TaskDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class TaskService {
    private ProjectDao projectDao;
    private TaskDao taskDao;
    private SubTaskDao subTaskDao;


    @Autowired
    public TaskService(ProjectDao projectDao, TaskDao taskDao, SubTaskDao subTaskDao) {
        this.projectDao = projectDao;
        this.taskDao = taskDao;
        this.subTaskDao = subTaskDao;
    }


    public void addSubTaskToTaskById(Long taskId, SubTask subTask) {
        Task task = taskDao.getTask(taskId);
        List<SubTask> subTasks = task.getSubTaskList();
        subTasks.add(subTask);
        task.setSubTaskList(subTasks);

        taskDao.saveTask(task);
        subTask.setTask(task);
        subTaskDao.saveSubTask(subTask);
    }

    public Task getTaskByIds(Long taskId) {
        return taskDao.getTask(taskId);
    }

    public void addNewTask(Task task, Long id) {
        System.out.println("date: " + task.getDeadLine());
        projectDao.getProjectById(id).addTask(task);
        Project project = projectDao.getProjectById(id);
        task.setProject(project);


        taskDao.addTask(task);
    }

    public void deleteTaskById(Long taskId) {
        taskDao.deleteTaskById(taskId);
    }
    /*public boolean deleteSUbTaskById(UUID projectId, UUID taskId, UUID subTaskId) {
        return taskDao.deleteSubtaskById(projectId,taskId, subTaskId);
    }*/
}
