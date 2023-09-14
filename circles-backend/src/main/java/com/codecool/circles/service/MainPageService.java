package com.codecool.circles.service;

import com.codecool.circles.model.Member;
import com.codecool.circles.model.Project;
import com.codecool.circles.model.Task;
import com.codecool.circles.service.dao.MainPageDao;
import com.codecool.circles.service.dao.MemberDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MainPageService {
    private MainPageDao mainPageDao;
    private MemberDao memberDao;

    @Autowired
    public MainPageService(MainPageDao mainPageDao, MemberDao memberDao) {
        this.mainPageDao = mainPageDao;
        this.memberDao = memberDao;
    }

    public List<Project> getProjects() {

     //   memberDao.populateDataBase(); //for database population with members
        return mainPageDao.getProjects();
    }

    public void addNewProjects(Project project) {
        List<Member> memberList = project.getMembers();
//        for(Member member : memberList){
//            System.out.println("project members " + member.getName());
//            List<Project> projectList = member.getProject();
//            projectList.add(project);
//            member.setProject(projectList);
//            memberDao.saveMember(member);
//        }
        mainPageDao.addNewProject(project);
    }

    //     System.out.println("date: " + task.getDeadLine());
//        projectDao.getProjectById(id).addTask(task);
//    Project project = projectDao.getProjectById(id);
//        task.setProject(project);
//    List<Member> memberList = task.getMembers();
//       for (Member member:memberList){
//        List <Task> tasks=member.getTaskList();
//        tasks.add(task);
//        member.setTaskList(tasks);
//        memberDao.saveMember(member);

    public List<Member> getAllMember() {
        return memberDao.getAllMember();
    }

    public List<Member> getAllMemberWhoIsNotCoWorker() {
        return getAllMember().stream().filter(member -> member.isCoWorker() == false).toList();
    }

    public void setMemberToCoWorker(Long id) {
        memberDao.setCoworker(id);
    }
}
