package com.codecool.circles.service.dao;

import com.codecool.circles.model.Project;
import com.codecool.circles.model.Task;
import com.codecool.circles.model.User;
import com.codecool.circles.model.storage.Storage;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
@Repository

public class ProjectDaoImpl implements ProjectDao {

    private Storage storage;

    public ProjectDaoImpl(Storage storage) {
        this.storage = storage;
    }


    @Override
    public void addUser(UUID projectId ,User user) {
        getProjectById(projectId).addUser(user);
    }

    @Override
    public void addUsers(UUID projectId, List<User> user) {
        getProjectById(projectId).addUsers(user);
    }

    @Override
    public List<Task> getAllTasks(UUID projectId) {
      return   getProjectById(projectId).getAllTask();
    }

    @Override
    public void addTask(Task task) {
        System.out.println(task.getProjectId()+"daoban");
        if (task.getUsers()==null){
            task.setUsers(new ArrayList<>());
        }
        Task newTask=new Task(task.getProjectId(), task.getName(), task.getDeadLine(),task.getUsers());
        getProjectById(task.getProjectId()).addTask(newTask);
        List<Task> projectTasks=getProjectById(task.getProjectId()).getAllTask();
        for (Task task1:projectTasks){
            System.out.println(task1.getName());
        }
    }

    private Project getProjectById(UUID projectId) {
        return storage.getProjectById(projectId);
    }


}
