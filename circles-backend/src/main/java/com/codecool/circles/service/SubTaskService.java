package com.codecool.circles.service;


import com.codecool.circles.service.dao.SubTaskDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service

public class SubTaskService {
    private SubTaskDao subTaskDao;

    @Autowired
    public SubTaskService(SubTaskDao subTaskDao) {
        this.subTaskDao = subTaskDao;
    }

    public ResponseEntity<String> deleteSUbTaskById(Long subTaskId) {
        ResponseEntity<String> response = subTaskDao.deleteSubtaskById(subTaskId);
        return response;
    }
}
