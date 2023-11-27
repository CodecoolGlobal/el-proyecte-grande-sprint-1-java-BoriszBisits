package com.codecool.circles.service;

import com.codecool.circles.model.*;
import com.codecool.circles.service.dao.MemberDao;
import com.codecool.circles.service.dao.ProjectDao;
import com.codecool.circles.service.dao.SubTaskDao;
import com.codecool.circles.service.dao.TaskDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskService {
    private ProjectDao projectDao;
    private TaskDao taskDao;
    private SubTaskDao subTaskDao;
    private MemberDao memberDao;


    @Autowired
    public TaskService(ProjectDao projectDao, TaskDao taskDao, SubTaskDao subTaskDao, MemberDao memberDao) {
        this.projectDao = projectDao;
        this.taskDao = taskDao;
        this.subTaskDao = subTaskDao;
        this.memberDao = memberDao;
    }

//    public List<Member> getCoworkers() {
//        return memberDao.getAllMember();
//    }

    public void addSubTaskToTaskById(Long taskId, SubTask subTask) {
        Task task = taskDao.getTask(taskId);
        task.setCompleted(false);
        //task.checkCompleted();
        List<SubTask> subTasks = task.getSubTaskList();
        subTasks.add(subTask);
        task.setSubTaskList(subTasks);

        taskDao.saveTask(task);
        subTask.setTask(task);
        subTaskDao.saveSubTask(subTask);
    }

    public Task getTaskByIds(Long taskId) {
       Task task = taskDao.getTask(taskId);
       task.checkSubtasksCompletionLevel();
       taskDao.saveTask(task);
        return task;
    }

    public void addNewTask(Task task, Long id) {
        System.out.println("date: " + task.getDeadLine());
        projectDao.getProjectById(id).addTask(task);
        Project project = projectDao.getProjectById(id);
        task.setProject(project);
        taskDao.saveTask(task);
        List<Member> memberList = task.getMembers();

       for (Member member:memberList){
        Member member1=   memberDao.getMemberById(member.getId());
        //List<Task> tasks=member1.getTaskList();
       // tasks.add(task);
        member1.addTask(task);
        //member1.addProjet(project);
        memberDao.saveMember(member1);

       }
      //  taskDao.addTask(task);
    }

    public List<Member> getCoWorkers(Long projectId,Long taskId){
        String tasksSubtypeName=taskDao.getTask(taskId).getSubtype();
        List<Member>members=memberDao.getCoWorkers(projectId,taskId);
        List<Member>filteredMembers=new ArrayList<>();
        for (Member member:members){
            List<String> membersSubtypesName=new ArrayList<>();
            for (SubType subType:member.getSubTypes()){
                membersSubtypesName.add(subType.getName());
            }
            if(membersSubtypesName.contains(tasksSubtypeName)){
                filteredMembers.add(member);
            }
        }

        return filteredMembers;
    }

    public ResponseEntity<String> deleteTaskById(Long taskId,Long projectId) {
        Task task = taskDao.getTask(taskId);
        List<SubTask> subTasksForDelete = task.getSubTaskList();
        for(SubTask subTaskForDelete : subTasksForDelete){
            subTaskDao.deleteSubtaskById(subTaskForDelete.getId());
        }
        ResponseEntity<String> response = taskDao.deleteTaskById(taskId);

        Project project = projectDao.getProjectById(projectId);
        project.setCompletionLevelAfterDeleteEveryTasks();
        projectDao.save(project);

        return response;
    }
    public void addMemberToTask(Long taskId, Long memberId) {
        Member member = memberDao.getMemberById(memberId);
        Task task = taskDao.getTask(taskId);
        task.addMemberToTask(member);
        memberDao.saveMember(member);
    }
    public void addCompletionLevel(String completionLevel,Long taskId){
        Task task = taskDao.getTask(taskId);
        task.setCompletionLevel(Integer.parseInt(completionLevel));
        taskDao.saveTask(task);
    }
}
