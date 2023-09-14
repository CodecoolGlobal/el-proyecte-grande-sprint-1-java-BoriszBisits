package com.codecool.circles.service;

import com.codecool.circles.model.Member;
import com.codecool.circles.model.Project;
import com.codecool.circles.model.SubTask;
import com.codecool.circles.model.Task;
import com.codecool.circles.service.dao.MemberDao;
import com.codecool.circles.service.dao.ProjectDao;
import com.codecool.circles.service.dao.SubTaskDao;
import com.codecool.circles.service.dao.TaskDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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

    public List<Member> getCoworkers() {
        return memberDao.getAllMember().stream().filter(member -> member.isCoWorker() == true).toList();
    }

    public void addSubTaskToTaskById(Long taskId, SubTask subTask) {
        Task task = taskDao.getTask(taskId);
        List<SubTask> subTasks = task.getSubTaskList();
        subTasks.add(subTask);
        task.setSubTaskList(subTasks);

        taskDao.saveTask(task);
        subTask.setTask(task);
        subTaskDao.saveSubTask(subTask);
    }

    public Task getTaskByIds(Long taskId) {
        return taskDao.getTask(taskId);
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
        member1.addProjet(project);
        memberDao.saveMember(member1);

       }



      //  taskDao.addTask(task);
    }

    public ResponseEntity<String> deleteTaskById(Long taskId) {
        ResponseEntity<String> response = taskDao.deleteTaskById(taskId);
        return response;
    }

}
