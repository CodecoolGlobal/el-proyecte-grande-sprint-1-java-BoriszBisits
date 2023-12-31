package com.codecool.circles.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;


import java.time.LocalDate;
import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "subtask")

public class SubTask {
    @Id
    // @JsonIgnore
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int levelOfCompletion = 0;
    private boolean isCompleted = false;
    private String description;
    @JsonIgnore
    @ManyToOne
    private Task task;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate deadLine;
    private String colorOfCircle;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "member_subtask",
            joinColumns = @JoinColumn(name = "subtask_id"),
            inverseJoinColumns = @JoinColumn(name = "member_id")
    )
    private List<Member> memberList;


    public String getColorOfCircle() {
        return colorOfCircle;
    }

    public String getName() {
        return name;
    }

    public int getLevelOfCompletion() {
        return levelOfCompletion;
    }

    public boolean isCompleted() {
        return isCompleted;
    }

    public String getDescription() {
        return description;
    }

    public List<Member> getMemberList() {
        return memberList;
    }


    public void setCompleted(String completionLevel) {
        setLevelOfCompletion(Integer.parseInt(completionLevel));
        if (levelOfCompletion == 100) {

            isCompleted = true;
        } else {
            isCompleted = false;
        }
        //task.checkCompleted();

    }

    public void addUser(Member member) {
        memberList.add(member);
    }

    public void setLevelOfCompletion(int levelOfCompletion) {
        this.levelOfCompletion = levelOfCompletion;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCompleted(boolean completed) {
        isCompleted = completed;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public void setColorOfCircle(String colorOfCircle) {
        this.colorOfCircle = colorOfCircle;
    }

    public void setMemberList(List<Member> memberList) {
        this.memberList = memberList;
    }

    public boolean deleteUserFromProject(Member member) {
        if (memberList.contains(member)) {
            memberList.remove(member);
            return true;
        }
        return false;
    }

    public void addMemberToSubtaskTask(Member member) {
        memberList.add(member);
    }
}
