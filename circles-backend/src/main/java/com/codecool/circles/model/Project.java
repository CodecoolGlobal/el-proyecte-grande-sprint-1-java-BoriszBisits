package com.codecool.circles.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "project")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private boolean isCompleted = false;
    private int levelOfCompletion = 0;


    @JsonIgnore
    @ManyToOne
    @JoinTable(
            name = "owned_projects",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "member_id")
    )
    private Member owner;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "co_worker_project",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "member_id")
    )
    private List<Member> members = new ArrayList<>();

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<Task> taskList = new ArrayList<>();
    @JsonIgnore
    @OneToMany
    @JoinTable(
            name = "notes_project",
            joinColumns = @JoinColumn(name = "project_id"),
            inverseJoinColumns = @JoinColumn(name = "note_id")
    )
    private List<Note> chat = new ArrayList<>();
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate deadLine;

    @JsonProperty("name")
    private String name;

    private String leader;

    private String type;

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

    public void addUser(Member member) {
        members.add(member);
    }

    public void addUsers(List<Member> userlist) {
        members.addAll(userlist);
    }

    public List<Task> getAllTask() {
        return taskList;
    }

    public void addMemberToProject(Project project, Member member) {
        //project.getMembers().add(member);
        members.add(member);
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
            if (task.getId().equals(taskId)) {
                taskToRemove = task;
                break;
            }
        }

        if (taskToRemove != null) {
            taskList.remove(taskToRemove);
            System.out.println("Deleted task: " + taskToRemove.getName());
            return true;
        }
        return false;
    }

    public void checkLevelOfCompletion() {
        if (!taskList.isEmpty()) {
            int completedSubtasks = 0;

            for (Task task : taskList) {
                if (task.isCompleted()) {
                    completedSubtasks++;
                }
            }

            // Calculate the percentage of completed subtasks
            int totalSubtasks = taskList.size();
            int levelOfCompletion = (int) (((double) completedSubtasks / totalSubtasks) * 100);

            setLevelOfCompletion(levelOfCompletion);

        } else {
            setLevelOfCompletion(0);
        }
    }

    public void checkTasksCompletionLevel(){
        if(taskList.size() !=0){
            int counter = 0;
            for(Task task : taskList){
                if(!task.isCompleted()){
                    counter++;
                }
                System.out.println("counter " + counter);
                System.out.println();
                if(counter > 0){
                    isCompleted = false;
                    int completedTaskNumber = taskList.size() - counter;
                    System.out.println("completedSubTaskNumber " + completedTaskNumber);
                    int completionLevelNumber = (int) (((double) completedTaskNumber / taskList.size()) * 100);
                    System.out.println("completion level " + completionLevelNumber);
                    setLevelOfCompletion(completionLevelNumber);
                    System.out.println("level Of compeltion " + levelOfCompletion);
                } else {
                    System.out.println("true ág");
                    levelOfCompletion = 100;
                    setCompleted(true);
                }
            }
            counter = 0;
        }
    }

    public void setCompletionLevelAfterDeleteEveryTasks(){
        if(taskList.size() == 0){
            levelOfCompletion = 0;
            setCompleted(false);
        }
    }
    public void setCompletionLevel(int completionLevel){
        levelOfCompletion = completionLevel;
        if(levelOfCompletion == 100){
            isCompleted = true;
        } else {
            isCompleted = false;
        }
    }

//    public void setCompletionLevel(int completionLevel) {
//        levelOfCompletion = completionLevel;
//        System.out.println("size " + taskList.size());
//        if (taskList.size() == 0) {
//            System.out.println(levelOfCompletion);
//            System.out.println("empty");
//            if (levelOfCompletion == 100) {
//                System.out.println("igen");
//                isCompleted = true;
//            } else {
//                System.out.println("nem");
//                isCompleted = false;
//            }
//        } else {
//            for (Task task : taskList) {
//                if (!task.isCompleted()) {
//                    isCompleted = false;
//                } else {
//                    isCompleted = true;
//                }
//            }
//        }
//    }


//public void checkTasksAreCompleted(){
//
//        for(Task task : taskList){
//            if(!task.isCompleted()){
//                isCompleted = false;
//                System.out.println("isCompletedTask " + task.isCompleted());
//                System.out.println("isCompeltedProject " + isCompleted);
//                break;
//            } else {
//                isCompleted = true;
//            }
//        }
//}
//    public void checkCompleted() {
//        setCompleted(true);
//
//        if (!taskList.isEmpty()) {
//            for (Task task : taskList) {
//                if (!task.isCompleted()) {
//                    System.out.println("false");
//                    setCompleted(false);
//                    break;
//                }
//            }
//        } else {
//            setCompleted(false);
//        }
//    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }


}
