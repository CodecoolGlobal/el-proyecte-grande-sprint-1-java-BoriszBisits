package com.codecool.circles.service.dao;

import com.codecool.circles.model.SubTask;


import com.codecool.circles.model.Member;
import com.codecool.circles.repositories.SubTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> deleteSubtaskById(Long subTaskId) {
        try {
            subTaskRepository.deleteById(subTaskId);
            return new ResponseEntity<>("Task deleted successfully", HttpStatus.OK);
        } catch (
                EmptyResultDataAccessException e) {
            return new ResponseEntity<>("Task not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while deleting the task", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
