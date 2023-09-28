package com.codecool.circles.service;

import com.codecool.circles.model.Member;
import com.codecool.circles.model.Project;
import com.codecool.circles.model.Task;
import com.codecool.circles.service.dao.MainPageDao;
import com.codecool.circles.service.dao.MemberDao;
import com.codecool.circles.service.dao.ProjectDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MainPageService {
    private MainPageDao mainPageDao;
    private MemberDao memberDao;
    private ProjectDao projectDao;
    @Autowired

    public MainPageService(MainPageDao mainPageDao, MemberDao memberDao, ProjectDao projectDao) {
        this.mainPageDao = mainPageDao;
        this.memberDao = memberDao;
        this.projectDao = projectDao;
    }



    public List<Project> getProjects(String leader) {
         Member member=memberDao.findMemberByName(leader);
        System.out.println( "member projects"+ member.getProject());
        return member.getProject();
    }

    public void addNewProjects(Project project) {
        projectDao.save(project);
        Member member=memberDao.findMemberByName(project.getLeader());
        List <Project> projects=member.getProject();
        projects.add(project);

        member.setProject(projects);
        memberDao.saveMember(member);






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
    public List<Member>getALLMemberWoIsCoworker(){
        return getAllMember().stream().filter(member -> member.isCoWorker() ==true).toList();
    }

    public void setMemberToCoWorker(Long id) {

        memberDao.setCoworker(id);
    }
}
