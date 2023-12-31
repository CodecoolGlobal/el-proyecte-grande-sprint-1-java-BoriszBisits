package com.codecool.circles.service.dao;

import com.codecool.circles.model.Project;
import com.codecool.circles.model.Task;
import com.codecool.circles.model.Member;
import com.codecool.circles.model.storage.Storage;
import com.codecool.circles.repositories.ProjectRepository;
import com.codecool.circles.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Repository


public class ProjectDaoImpl implements ProjectDao {

    private ProjectRepository projectRepository;


    @Autowired
    public ProjectDaoImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;

    }


    @Override
    public void addUser(Long projectId, Member member) {

    }

    @Override
    public void addUsers(Long projectId, List<Member> member) {

    }

    @Override
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public List<Task> getAllTasks(Long projectId) {
        System.out.println("daoimpl" + projectId);
        return getProjectById(projectId).getAllTask();
    }


    public Project getProjectById(Long projectId) {
        return projectRepository.getById(projectId);
    }

    @Override
    public Project getProjectByName(String name) {
        return projectRepository.findProjectByName(name);
    }

    @Override
    public void save(Project project) {
        projectRepository.save(project);
    }

    public void getTaskSavedToProject(Long id, Task task) {
        Project project = projectRepository.findById(id).get();
        project.addTask(task);
        projectRepository.save(project);
    }


}
