package com.codecool.circles.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

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
    private String subtype;
    private boolean isCompleted = false;



    private String name;
    @OneToMany(mappedBy = "task")
    private List<SubTask> subTaskList = new ArrayList<>();


    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate deadLine;
    private String colorOfCircle;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    public String getColorOfCircle() {
        return colorOfCircle;
    }

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "member_task",
            joinColumns = @JoinColumn(name = "task_id"),
            inverseJoinColumns = @JoinColumn(name = "member_id")
    )
    private List<Member> members = new ArrayList<>();

    public void setDeadLine(LocalDate deadLine) {
        this.deadLine = deadLine;
    }

    public void setMembers(List<Member> members) {
        this.members = members;
    }


    public Task(String name, LocalDate deadLine, List<Member> members) {

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

    public void checkCompleted() {
        setCompleted(true);
        System.out.println("task-check completed");
        //project.checkCompleted();
        if (!subTaskList.isEmpty()) {
            for (SubTask subTask : subTaskList) {
                if (!subTask.isCompleted()) {
                    System.out.println("false");
                    setCompleted(false);
                    break;
                }
            }
        } else {
            setCompleted(false);
        }
    }


    public void addMemberToTask(Member member){
        members.add(member);
        for(Member member1 : members){
            System.out.println("ember " + member1.getName());
        }
    }
    /*public boolean removeSubTaskById(UUID subTaskId) {

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
    }*/
}
