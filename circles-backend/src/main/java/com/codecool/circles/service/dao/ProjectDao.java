package com.codecool.circles.service.dao;

import com.codecool.circles.model.Project;

import java.util.List;

public interface ProjectDao {

    public List<Project> getProjects();
    public void addNewProject(String projectName);

}
