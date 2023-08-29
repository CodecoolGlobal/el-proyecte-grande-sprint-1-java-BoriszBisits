package com.codecool.circles.service.dao;

import com.codecool.circles.model.Project;
import com.codecool.circles.model.Task;
import com.codecool.circles.model.User;

import java.time.LocalDate;
import java.util.List;

public class ProjectDaoImpl implements ProjectDao {

    Project sampleProject=new Project("kamu");
    @Override
    public void addUser(User user) {
        sampleProject.addUsers(user);
    }

    @Override
    public void addUsers(List<User> users) {
    sampleProject.addUsers(users);
    }

    @Override
    public List<Task> getAllTasks() {
      return sampleProject.getAllTask();
    }

    @Override
    public void addTask(String name, LocalDate deadLine, List<User> users) {
        Task newTask=new Task(name,deadLine,users);
       sampleProject.addTask(newTask);
    }
}
