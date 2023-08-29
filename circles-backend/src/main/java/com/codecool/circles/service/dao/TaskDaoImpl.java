package com.codecool.circles.service.dao;

import com.codecool.circles.model.SubTask;
import com.codecool.circles.model.Task;
import com.codecool.circles.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
@Repository

public class TaskDaoImpl implements TaskDao{

    List<Task> allTasks;

    List<SubTask>subTaskList;


    @Override
    public Task getTask(UUID taskID) {
      for (Task task:allTasks){
          if (task.getId().equals(taskID)){
              return task;
          }
      }
      return null;
    }
    @Autowired
    public TaskDaoImpl() {
        this.allTasks = new ArrayList<>();
        this.subTaskList = new ArrayList<>();
    }

    @Override
    public void addSubTask(String name, String description, List<User> users) {
        subTaskList.add(new SubTask(name,description,users));
    }
}
