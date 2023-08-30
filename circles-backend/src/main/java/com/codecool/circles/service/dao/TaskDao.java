package com.codecool.circles.service.dao;

import com.codecool.circles.model.Project;
import com.codecool.circles.model.SubTask;
import com.codecool.circles.model.Task;
import com.codecool.circles.model.User;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface TaskDao {


    public Task getTask(UUID taskID , UUID projectId);


}
