package com.codecool.circles.service.dao;

import com.codecool.circles.model.Task;

public interface TaskDao {


    public Task getTask(Long taskID , Long projectId);

    public boolean deleteTaskById(Long projectId, Long taskId);


}
