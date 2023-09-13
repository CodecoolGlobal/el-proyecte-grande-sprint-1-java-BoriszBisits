package com.codecool.circles.service.dao;

import com.codecool.circles.model.SubTask;



import com.codecool.circles.model.Member;
import com.codecool.circles.repositories.SubTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class SubTaskImpl implements SubTaskDao {

private SubTaskRepository subTaskRepository;
@Autowired

    public SubTaskImpl(SubTaskRepository subTaskRepository) {
        this.subTaskRepository = subTaskRepository;
    }

    @Override
    public void setLevelOfCompletion(int percentOfCompletion) {

    }

    @Override
    public void addUser(Member member) {

    }

    @Override
    public void saveSubTask(SubTask subTask) {
        subTaskRepository.save(subTask);
    }


}
