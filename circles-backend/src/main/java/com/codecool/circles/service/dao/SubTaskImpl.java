package com.codecool.circles.service.dao;

import com.codecool.circles.model.SubTask;
import com.codecool.circles.model.User;

import java.util.ArrayList;

public class SubTaskImpl implements SubTaskDao {
    SubTask sampleSubtask = new SubTask("sampleSub", "sample");

    @Override
    public void setLevelOfCompletion(int percentOfCompletion) {
        sampleSubtask.setLevelOfCompletion(percentOfCompletion);

    }

    @Override
    public void addUser(User user) {
        sampleSubtask.addUser(user);
    }
}
