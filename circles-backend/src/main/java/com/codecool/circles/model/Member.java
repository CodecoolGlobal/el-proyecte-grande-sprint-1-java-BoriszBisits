package com.codecool.circles.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;


import java.util.ArrayList;
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
    @GeneratedValue
    private Long id;
    private String name;
    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "co_worker_project",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "project_id")
    )
    private List<Project> coWorkerProjects = new ArrayList<>();


    @JsonIgnore
    // TODO:  Use @JsonManagedReference and @JsonBackReference annotations on the two side
    //        (Read the documentation for both)
    @ManyToMany
    @JoinTable(
            name = "member_task",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "task_id")
    )

    private List<Task> taskList=new ArrayList<>();
    @JsonIgnore
    @ManyToMany

    @JoinTable(
            name = "member_coworker",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "coworker_id")
    )
    private List<Member> coWorkers = new ArrayList<>();
    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "member_subtask",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "subtask_id")
    )
    private List<SubTask> subTaskList =new ArrayList<>();

    @OneToMany(mappedBy = "owner")
    private List<Project> ownedProjects = new ArrayList<>();

    private String password;
    private String email;
    @Enumerated(EnumType.STRING)
    private Role role;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public void addTask(Task task){
        taskList.add(task);
    }
    public void addProjet(Project project1){
        coWorkerProjects.add(project1);
    }

    public String getPassword() {
        return password;
    }

    public Role getRole() {
        return role;
    }

    public void addCoworker(Member coWorker) {
        coWorkers.add(coWorker);
    }
}
