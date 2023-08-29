package com.codecool.circles.service.dao;

import com.codecool.circles.model.User;

public interface SubTaskDao {
    public void setLevelOfCompletion(int percentOfCompletion );
    public void addUser(User user);


}
