package com.codecool.circles.service;

import com.codecool.circles.model.SubTask;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubTaskService {
    private List<SubTask> subTaskList;

    public SubTask getSubTaskById(){
        for(SubTask subTask: subTaskList){
            if(subTask.getId().equals(subTask.getId())){
                return subTask;
            }
        }
        return null;
    }
}
