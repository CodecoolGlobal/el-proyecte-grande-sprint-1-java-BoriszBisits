package com.codecool.circles.model;

import com.fasterxml.jackson.annotation.JsonProperty;
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
@Table(name = "project")
public class Project {
    @Id
    //   @JsonIgnore
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToMany
    @JoinTable(name = "member_project", joinColumns = @JoinColumn(name = "project_id"), inverseJoinColumns = @JoinColumn(name = "member_id"))
    private List<Member> members = new ArrayList<>();
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<Task> taskList = new ArrayList<>();


    @JsonProperty("name")
    private String name;

    public Project(String name) {
        this.name = name;
    }

    public List<Member> getMembers() {
        return members;
    }

    public void setMembers(List<Member> members) {
        this.members = members;
    }

    public List<Task> getTaskList() {
        return taskList;
    }

    public String getName() {
        return name;
    }

    public void setTaskList(List<Task> taskList) {
        this.taskList = taskList;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void addUser(Member member) {
        members.add(member);

    }

    public void addUsers(List<Member> userlist) {
        members.addAll(userlist);

    }

    public List<Task> getAllTask() {
        return taskList;
    }


    public Task getTaskById(Long taskId) {
        for (Task task : taskList) {
            if (task.getId().equals(taskId)) {
                return task;
            }
        }
        return null;
    }

    public void addTask(Task task) {
        taskList.add(task);
    }

    public boolean removeTaskById(Long taskId) {

        Task taskToRemove = null;
        for (Task task : taskList) {
            if (task.getId().equals(taskId)) taskToRemove = task;
            break;
        }

        if (taskToRemove != null) {
            taskList.remove(taskToRemove);
            System.out.println("deleted task :" + taskToRemove.getName());
            return true;
        }
        return false;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}




