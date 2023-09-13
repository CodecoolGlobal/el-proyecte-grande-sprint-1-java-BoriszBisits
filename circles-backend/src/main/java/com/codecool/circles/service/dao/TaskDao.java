package com.codecool.circles.service.dao;

import com.codecool.circles.model.Task;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TaskDao {


    public Task getTask(Long taskID );

    public ResponseEntity<String> deleteTaskById(Long taskId);
    public void addTask(Task task);
    public List<Task> getTasksByProjectId(Long projectId);
    public void saveTask(Task task);

/*
    public boolean deleteSubtaskById(UUID projectId, UUID taskId, UUID subTaskId);
*/
}
