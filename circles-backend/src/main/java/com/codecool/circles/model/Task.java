package com.codecool.circles.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "task")

public class Task {
    @Id
   // @JsonIgnore
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    private String name;
    @OneToMany(mappedBy = "task")
    private List<SubTask> subTaskList = new ArrayList<>();
    private LocalDate deadLine;
    private String colorOfCircle;
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;
    public String getColorOfCircle() {
        return colorOfCircle;
    }

    @ManyToMany(mappedBy = "taskList")
    private List<Member> members = new ArrayList<>();

    public void setDeadLine(LocalDate deadLine) {
        this.deadLine = deadLine;
    }

    public void setMembers(List<Member> members) {
        this.members = members;
    }


    public Task( String name, LocalDate deadLine, List<Member> members) {

        this.name = name;

        this.deadLine = deadLine;

        this.members = members;

    }

    public int getTimeTillDeadLine() {

        Period period = Period.between(deadLine, LocalDate.now());
        ;
        return period.getDays();
    }

    public List<SubTask> getSubTaskList() {
        return subTaskList;
    }

    public void addSubTask(SubTask subTask) {
        subTaskList.add(subTask);
    }

    public String getName() {
        return name;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public LocalDate getDeadLine() {
        return deadLine;
    }

    public List<Member> getMembers() {
        return members;
    }

    public SubTask getSubTaskById(Long uuid) {
        for (SubTask subTask : subTaskList) {
            if (subTask.getId().equals(uuid)) {
                return subTask;
            }
        }
        return null;
    }
    public boolean removeSubTaskById(UUID subTaskId) {

        SubTask subtaskToRemove = null;
        for (SubTask subTask : subTaskList) {
            if (subTask.getId().equals(subTaskId))
                subtaskToRemove = subTask;
            break;
        }

        if (subtaskToRemove != null) {
            subTaskList.remove(subtaskToRemove);
            System.out.println("deleted task :" + subtaskToRemove.getName());
            return true;
        }
        return false;
    }
}
