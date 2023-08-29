package com.codecool.circles.service.dao;

import com.codecool.circles.model.Task;
import com.codecool.circles.model.User;

import java.time.LocalDate;
import java.util.List;

public interface ProjectDao {
    public void addUser(User user);

    public void addUsers(List<User> user);

    public List<Task> getAllTasks();

    public void addTask(String name, LocalDate deadLine, List<User> users); ///shoud be in projetsDao???
}
