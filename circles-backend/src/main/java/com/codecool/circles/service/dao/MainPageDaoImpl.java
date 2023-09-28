package com.codecool.circles.service.dao;

import com.codecool.circles.model.Member;
import com.codecool.circles.model.Project;
import com.codecool.circles.model.Task;
import com.codecool.circles.model.storage.Storage;
import com.codecool.circles.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class MainPageDaoImpl implements MainPageDao {


   private ProjectRepository projectRepository;

    public MainPageDaoImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Autowired


    @Override
    public List<Project> getProjects() {
        return projectRepository.findAll();
    }

    @Override
    public void addNewProject(Project project) {
        System.out.println("new project: " + project);
        projectRepository.save(project);
    }

}
