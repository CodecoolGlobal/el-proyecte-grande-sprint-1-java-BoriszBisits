package com.codecool.circles.service.dao;

import com.codecool.circles.model.Project;
import com.codecool.circles.model.storage.Storage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class MainPageDaoImpl implements MainPageDao {


    private Storage storage;
@Autowired
    public MainPageDaoImpl(Storage storage) {
        this.storage = storage;
    }

    @Override
    public List<Project> getProjects() {
        return storage.getProjects();
    }

    @Override
    public void addNewProject(String projectName) {
        storage.addProject(new Project(projectName));
    }
}
