package com.codecool.circles.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class SubTask {
    private String name;
    private int levelOfCompletion = 0;
    private boolean isCompleted = false;
    private String description;

    private String colorOfCircle;
    private List<User> userList=new ArrayList<>();
    private UUID id = UUID.randomUUID();

    public SubTask(String name, String description) {
        this.name = name;
        this.description = description;

    }


 


    public String getColorOfCircle() {
        return colorOfCircle;
    }

    public String getName() {
        return name;
    }

    public int getLevelOfCompletion() {
        return levelOfCompletion;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public String getDescription() {
        return description;
    }

    public List<User> getUserList() {
        return userList;
    }

    public UUID getId() {
        return id;
    }

    public void setCompleted() {
        if (levelOfCompletion == 100) {

            isCompleted = true;
        }
    }

    public void addUser(User user) {
        userList.add(user);
    }

    public void setLevelOfCompletion(int levelOfCompletion) {
        this.levelOfCompletion = levelOfCompletion;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean deleteUserFromProject(User user) {
        if (userList.contains(user)) {
            userList.remove(user);
            return true;
        }
        return false;
    }

}
