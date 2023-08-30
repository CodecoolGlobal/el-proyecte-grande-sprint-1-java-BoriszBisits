package com.codecool.circles.model.storage;

import com.codecool.circles.model.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class Storage {
    private List<Project>projects;


    public Storage() {
        this.projects = new ArrayList<>();
    }

    public List<Project> getProjects() {
        return projects;
    }

    public void  addProject(Project project){
        projects.add(project);
    }
    public Project getProjectById(UUID watedProject){
        for (Project project:projects){
            if (project.getId().equals(watedProject)){
                return project;
            }
        }
        return null;
    }
}