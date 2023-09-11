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
@Table(name = "member")
public class Member {
    @Id
   // @JsonIgnore
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ManyToMany(mappedBy = "members")
    private List<Project> project;
    @ManyToMany
    @JoinTable(
            name = "member_task",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "task_id")
    )

    private List<Task>taskList;
    @ManyToMany
    @JoinTable(
            name = "member_subtask",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "subtask_id")
    )
    private List<SubTask> subTaskList;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}






