package com.codecool.circles.service.dao;

import com.codecool.circles.model.SubTask;



import com.codecool.circles.model.Member;


public class SubTaskImpl implements SubTaskDao {
    SubTask sampleSubtask = new SubTask("sampleSub", "sample");

    @Override
    public void setLevelOfCompletion(int percentOfCompletion) {
        sampleSubtask.setLevelOfCompletion(percentOfCompletion);
    }

    @Override
    public void addUser(Member member) {
        sampleSubtask.addUser(member);
    }


}
