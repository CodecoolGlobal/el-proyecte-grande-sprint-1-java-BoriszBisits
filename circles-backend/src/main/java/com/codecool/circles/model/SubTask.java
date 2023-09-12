package com.codecool.circles.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
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
    @ManyToOne
    private Task task;

    private String colorOfCircle;
    @ManyToMany(mappedBy = "subTaskList")
    private List<Member> memberList;


    public SubTask(String name, String description) {
        this.name = name;
        this.description = description;

    }


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


    public void setCompleted() {
        if (levelOfCompletion == 100) {

            isCompleted = true;
        }
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

    public boolean deleteUserFromProject(Member member) {
        if (memberList.contains(member)) {
            memberList.remove(member);
            return true;
        }
        return false;
    }

}
