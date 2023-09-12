package com.codecool.circles.service.dao;

import com.codecool.circles.model.Task;

public interface TaskDao {


    public Task getTask(Long taskID );

    public void deleteTaskById( Long taskId);
    public void addTask(Task task);


}
