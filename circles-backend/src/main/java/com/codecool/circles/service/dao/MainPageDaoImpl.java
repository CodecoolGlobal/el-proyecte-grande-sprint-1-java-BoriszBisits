package com.codecool.circles.service.dao;

import com.codecool.circles.model.Member;
import com.codecool.circles.model.Project;
import com.codecool.circles.model.Task;
import com.codecool.circles.model.storage.Storage;
import com.codecool.circles.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @Override
    public ResponseEntity<String> deleteProjectById(Long projectId) {
        try {
            projectRepository.deleteById(projectId);
            return new ResponseEntity<>("Project deleted successfully", HttpStatus.OK);
        } catch (EmptyResultDataAccessException e) {
            return new ResponseEntity<>("Project not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while deleting the project", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
