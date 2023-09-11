package com.codecool.circles.service.dao;

import com.codecool.circles.model.Task;
import com.codecool.circles.model.storage.Storage;
import org.springframework.stereotype.Repository;

@Repository

public class TaskDaoImpl implements TaskDao{

  private Storage storage;

    public TaskDaoImpl(Storage storage) {
        this.storage = storage;
    }

    @Override
    public Task getTask(Long taskID , Long projectId) {

      return storage.getTaskById(taskID,projectId);
    }

  @Override
  public boolean deleteTaskById(Long projectId, Long taskId) {
    return storage.getProjectById(projectId).removeTaskById(taskId);
  }


}
