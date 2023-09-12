package com.codecool.circles.service.dao;

import com.codecool.circles.model.Member;

public interface SubTaskDao {
    public void setLevelOfCompletion(int percentOfCompletion );
    public void addUser(Member member);


}
