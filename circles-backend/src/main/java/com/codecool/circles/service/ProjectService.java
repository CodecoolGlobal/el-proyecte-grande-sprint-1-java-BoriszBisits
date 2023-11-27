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
        Project project = projectDao.getProjectById(projectId);
        project.checkLevelOfCompletion();
        return project;
    }

    public List<Task> getAllTaskByProjectId(Long projectId) {
        // System.out.println("service" + projectId);
        Project project = projectDao.getProjectById(projectId);
        //project.checkTasksAreCompleted();
        project.checkTasksCompletionLevel();
        projectDao.save(project);
        List<Task> tasks = taskDao.getTasksByProjectId(projectId);

        return tasks;
    }

    public List<Project> getAllProjects() {
        return projectDao.getAllProjects();
    }

    public void addCompletionLevel(String completionLevel, Long id) {
        Project project = projectDao.getProjectById(id);
        project.setCompletionLevel(Integer.parseInt(completionLevel));
        projectDao.save(project);
    }
}
