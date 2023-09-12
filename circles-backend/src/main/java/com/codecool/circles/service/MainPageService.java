package com.codecool.circles.service;

import com.codecool.circles.model.Project;
import com.codecool.circles.service.dao.MainPageDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MainPageService {
    private MainPageDao mainPageDao;

    @Autowired
    public MainPageService(MainPageDao mainPageDao) {
        this.mainPageDao = mainPageDao;
    }

    public List<Project> getProjects() {
        return mainPageDao.getProjects();
    }

    public void addNewProjects(String projectName) {
        mainPageDao.addNewProject(projectName);
    }

}
