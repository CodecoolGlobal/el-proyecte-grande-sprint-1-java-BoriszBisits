package com.codecool.circles.service.dao;

import com.codecool.circles.model.Member;
import org.springframework.http.ResponseEntity;
import com.codecool.circles.model.SubTask;

import java.util.UUID;

public interface SubTaskDao {
    public void setLevelOfCompletion(int percentOfCompletion );
    public void addUser(Member member);
    public void saveSubTask(SubTask subTask);

    public ResponseEntity<String> deleteSubtaskById(Long subTaskId);

}
