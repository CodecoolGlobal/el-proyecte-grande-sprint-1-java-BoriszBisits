package com.codecool.circles.service.dao;

import com.codecool.circles.model.Task;
import com.codecool.circles.model.storage.Storage;
import com.codecool.circles.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

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
  public ResponseEntity<String> deleteTaskById(Long taskId) {
    try {
      taskRepository.deleteById(taskId);
      return new ResponseEntity<>("Task deleted successfully", HttpStatus.OK);
    } catch (EmptyResultDataAccessException e) {
      return new ResponseEntity<>("Task not found", HttpStatus.NOT_FOUND);
    } catch (Exception e) {
      return new ResponseEntity<>("An error occurred while deleting the task", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Override
  public void addTask(Task task) {

    taskRepository.save(task);
  }

  @Override
  public List<Task> getTasksByProjectId(Long projectId) {
   return taskRepository.findByProjectId(projectId);
  }

  @Override
  public void saveTask(Task task) {
    taskRepository.save(task);
  }
/*
  @Override
  public boolean deleteSubtaskById(UUID projectId, UUID taskId, UUID subTaskId) {
    return storage.getProjectById(projectId).getTaskById(taskId).removeSubTaskById(subTaskId);
  }*/


}
