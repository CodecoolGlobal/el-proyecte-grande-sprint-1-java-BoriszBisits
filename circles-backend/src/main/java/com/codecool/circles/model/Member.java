package com.codecool.circles.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "member")
public class Member {
    @Id
    @GeneratedValue
    private Long id;
    private String name;



    @ManyToMany
    @JoinTable(
            name = "member_type",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "type_id")
    )
    private Set<Type> types = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "member_sub_type",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "sub_type_id")
    )
    private Set<SubType> subTypes = new HashSet<>();
    private byte[] profilePictureImage;

    @ManyToMany
    @JoinTable(
            name = "co_worker_project",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "project_id")
    )
    private List<Project> coProjects = new ArrayList<>();

    @OneToMany
    @JoinTable(
            name = "member_note",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "note_id"))
    private List<Note>notes=new ArrayList<>();


    @ManyToMany
    @JoinTable(
            name = "member_task",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "task_id")
    )
    private List<Task> taskList = new ArrayList<>();

    private InterestType interestType;

    public InterestType getInterestType() {
        return interestType;
    }

    public void setInterestType(InterestType interestType) {
        this.interestType = interestType;
    }

    @ManyToMany
    @JoinTable(
            name = "member_subtask",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "subtask_id")
    )
    private List<SubTask> subTaskList = new ArrayList<>();

    @OneToMany
    @JoinTable(
            name = "owned_projects",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "project_id")
    )
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

    public void addTask(Task task) {
        taskList.add(task);
    }

    public void addProject(Project project1) {
        coProjects.add(project1);
    }

    public String getPassword() {
        return password;
    }

    public Role getRole() {
        return role;
    }

    public void setNewUserNameToOwnedProject(String newUserName){
        for(Project project : ownedProjects){
            project.setLeader(newUserName);
        }

    }
public void addOwnProject(Project project){
        ownedProjects.add(project);
}
}
