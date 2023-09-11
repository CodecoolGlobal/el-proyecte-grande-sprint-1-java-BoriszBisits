package com.codecool.circles.service.dao;

import com.codecool.circles.model.SubTask;
import com.codecool.circles.model.Task;
import com.codecool.circles.model.User;
import com.codecool.circles.model.storage.Storage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
@Repository

public class TaskDaoImpl implements TaskDao{

  private Storage storage;

    public TaskDaoImpl(Storage storage) {
        this.storage = storage;
    }

    @Override
    public Task getTask(UUID taskID , UUID projectId) {

      return storage.getTaskById(taskID,projectId);
    }

  @Override
  public boolean deleteTaskById(UUID projectId, UUID taskId) {
    return storage.getProjectById(projectId).removeTaskById(taskId);
  }


}
