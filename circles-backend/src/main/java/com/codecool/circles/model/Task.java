package com.codecool.circles.model;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

public class Task {
    private List<SubTask> subTaskList =new ArrayList<>();

    private LocalDate deadLine;

    private List<User> users=new ArrayList<>();

    public Task(LocalDate deadLine) {
        this.deadLine = deadLine;
    }

    public int getTimeTillDeadLine(){

        Period period = Period.between(deadLine, LocalDate.now());;
        return period.getDays();
    }
    public void addSubTask(SubTask subTask){
        subTaskList.add(subTask);
    }
}
