package com.codecool.circles.service.dao;

import com.codecool.circles.model.Task;
import com.codecool.circles.model.User;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface ProjectDao {
    public void addUser(UUID projectId ,User user);

    public void addUsers(UUID projectId,List<User> user);

    public List<Task> getAllTasks(UUID projectId);

    public void addTask(Task task); ///shoud be in projetsDao???
}
