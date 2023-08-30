package com.codecool.circles.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Project {
    private UUID id =UUID.randomUUID();
    private List<User> users=new ArrayList<>();
    private List<Task>taskList=new ArrayList<>();



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
    public void addUser(User user){
        users.add(user);

    }
    public void addUsers(List<User> userlist){
        users.addAll(userlist);

    }
    public List<Task> getAllTask(){
        return taskList;
    }

    public UUID getId() {
        return id;
    }

    public void addTask(Task task){
        taskList.add(task);
    }
}
