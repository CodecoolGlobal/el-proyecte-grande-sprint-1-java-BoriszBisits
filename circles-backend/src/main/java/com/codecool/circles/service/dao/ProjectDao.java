package com.codecool.circles.service.dao;

import com.codecool.circles.model.Project;
import com.codecool.circles.model.Task;
import com.codecool.circles.model.Member;

import java.util.List;

public interface ProjectDao {
    public void addUser(Long projectId , Member member);

    public void addUsers(Long projectId,List<Member> member);

    public List<Task> getAllTasks(Long projectId);
    public void getTaskSavedToProject(Long id , Task task);

    public Project getProjectById(Long projectId);
    public Project getProjectByName(String name);

    public void save(Project project);


}
