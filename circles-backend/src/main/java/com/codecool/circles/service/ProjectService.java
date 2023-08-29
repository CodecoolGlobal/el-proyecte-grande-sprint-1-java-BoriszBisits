package com.codecool.circles.service;

import com.codecool.circles.model.Project;
import com.codecool.circles.service.dao.ProjectDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    private ProjectDao projectDao;

    @Autowired
    public ProjectService(ProjectDao projectDao) {
        this.projectDao = projectDao;
    }

    public List<Project> getProjects() {
        return projectDao.getProjects();
    }
    public void addNewProjects(String projectName){
        projectDao.addNewProject(projectName);
    }
}
