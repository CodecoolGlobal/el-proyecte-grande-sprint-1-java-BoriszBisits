package com.codecool.circles.service.dao;

import com.codecool.circles.model.User;

import java.util.UUID;

public interface SubTaskDao {
    public void setLevelOfCompletion(int percentOfCompletion );
    public void addUser(User user);


}
