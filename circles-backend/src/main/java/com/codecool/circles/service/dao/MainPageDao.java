package com.codecool.circles.service.dao;

import com.codecool.circles.model.Project;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface MainPageDao {


    public List<Project> getProjects();
    public void addNewProject(Project project);

    public ResponseEntity<String> deleteProjectById(Long projectId);
}
