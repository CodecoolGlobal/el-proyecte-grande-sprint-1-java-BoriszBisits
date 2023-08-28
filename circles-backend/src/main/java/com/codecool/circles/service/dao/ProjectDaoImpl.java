package com.codecool.circles.service.dao;

import com.codecool.circles.model.Project;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ProjectDaoImpl implements ProjectDao {

    private List<Project> projects;

    public ProjectDaoImpl() {
        this.projects = new ArrayList<>();
    }

    @Override
    public List<Project> getProjects() {
        return projects;
    }

    @Override
    public void addNewProject(String projectName) {
        projects.add(new Project(projectName));
    }
}
