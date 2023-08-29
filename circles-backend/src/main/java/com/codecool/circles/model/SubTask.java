package com.codecool.circles.model;

import java.util.ArrayList;
import java.util.List;

public class SubTask {
    private String name;
    private int levelOfCompletion;
    private String description;
    private List<User> userList;

    public SubTask(String name, String description) {
        this.name = name;
        this.levelOfCompletion = 0;
        this.description = description;
        this.userList = new ArrayList<>();
    }

    public void addUser(User user){
        userList.add(user);
    }

    public void setLevelOfCompletion(int levelOfCompletion) {
        this.levelOfCompletion = levelOfCompletion;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean deleteUserFromProject(User user){
        if(userList.contains(user)){
            userList.remove(user);
            return true;
        }
        return false;
    }


}
