package com.codecool.circles.model;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Task {
    public UUID getProjectId() {
        return projectId;
    }

    public void setProjectId(UUID projectId) {
        this.projectId = projectId;
    }

    private UUID projectId;
    private String name;
    private UUID id = UUID.randomUUID();
    private List<SubTask> subTaskList = new ArrayList<>();

    private LocalDate deadLine;

    private List<User> users = new ArrayList<>();

    public UUID getId() {
        return id;
    }

    public void setDeadLine(LocalDate deadLine) {
        this.deadLine = deadLine;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public Task(UUID projectId, String name, LocalDate deadLine, List<User> users) {
        this.projectId = projectId;
        this.name = name;
   ;
        this.deadLine = deadLine;
        this.users = users;
    }

    public int getTimeTillDeadLine() {

        Period period = Period.between(deadLine, LocalDate.now());
        ;
        return period.getDays();
    }

    public void addSubTask(SubTask subTask) {
        subTaskList.add(subTask);
    }

    public String getName() {
        return name;
    }

    public LocalDate getDeadLine() {
        return deadLine;
    }

    public List<User> getUsers() {
        return users;
    }
}
