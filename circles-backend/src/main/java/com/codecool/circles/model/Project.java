package com.codecool.circles.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Project {
    private UUID id = UUID.randomUUID();
    private List<User> users = new ArrayList<>();
    private List<Task> taskList = new ArrayList<>();


    @JsonProperty("name")
    private String name;

    public Project(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void addUser(User user) {
        users.add(user);

    }

    public void addUsers(List<User> userlist) {
        users.addAll(userlist);

    }

    public List<Task> getAllTask() {
        return taskList;
    }

    public UUID getId() {
        return id;
    }

    public Task getTaskById(UUID taskId) {
        for (Task task : taskList) {
            if (task.getId().equals(taskId)) {
                return task;
            }
        }
        return null;
    }

    public void addTask(Task task) {
        taskList.add(task);
    }

    public boolean removeTaskById(UUID taskId) {

        Task taskToRemove = null;
        for (Task task : taskList) {
            if (task.getId().equals(taskId))
                taskToRemove = task;
            break;
        }

        if (taskToRemove != null) {
            taskList.remove(taskToRemove);
            System.out.println("deleted task :" + taskToRemove.getName());
            return true;
        }
        return false;
    }
}




