package com.codecool.circles.service.dao;

import com.codecool.circles.model.Task;
import com.codecool.circles.model.storage.Storage;
import com.codecool.circles.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository

public class TaskDaoImpl implements TaskDao{
private TaskRepository taskRepository;
private ProjectDao projectDao;

  @Autowired
  public TaskDaoImpl(TaskRepository taskRepository, ProjectDao projectDao) {
    this.taskRepository = taskRepository;
    this.projectDao = projectDao;
  }






    @Override
    public Task getTask(Long taskID ) {


      return taskRepository.findById(taskID).get();
    }

  @Override
  public void deleteTaskById( Long taskId) {
    taskRepository.deleteById(taskId);
  }

  @Override
  public void addTask(Task task) {
    taskRepository.save(task);
  }


}
