package com.codecool.circles.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class SubTask {
    private String name;
    private int levelOfCompletion;
    private boolean isCompleted = false;
    private String description;
    private List<User> userList;
    private UUID id = UUID.randomUUID();

    public SubTask(String name, String description, List<User> userList) {
        this.name = name;
        this.description = description;
        this.userList = userList;
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
