package com.codecool.circles.service.dao;

import com.codecool.circles.model.SubTask;
import com.codecool.circles.model.Task;
import com.codecool.circles.model.User;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

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



    @Override
    public void addSubTask(String name, String description, List<User> users) {
        subTaskList.add(new SubTask(name,description,users));
    }
}
