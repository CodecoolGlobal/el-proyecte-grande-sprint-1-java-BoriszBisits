package com.codecool.circles.service;

import com.codecool.circles.model.Member;
import com.codecool.circles.model.Project;
import com.codecool.circles.service.dao.MainPageDao;
import com.codecool.circles.service.dao.MemberDao;
import com.codecool.circles.service.dao.ProjectDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


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


    public List<Project> getOwnedProjects(String leader) {
        Member member = memberDao.findMemberByName(leader);
        System.out.println("owned-projexts " + member.getOwnedProjects());
        List<Project> ownedProjects = mainPageDao.getProjects().stream().filter(project -> project.getLeader().equals(leader)).toList();
        return ownedProjects;
    }

    public void addNewProjects(Project project) {

        projectDao.save(project);
        Member member = memberDao.findMemberByName(project.getLeader());

        List<Project> ownedProjects = member.getOwnedProjects();
        ownedProjects.add(project);
        System.out.println("projekjei az embernek meg az uj projectt"+ ownedProjects);
        member.setOwnedProjects(ownedProjects);
       // member.setCoWorkerProjects(projects);

        memberDao.saveMember(member);
        System.out.println("owned" + member.getOwnedProjects());

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

    public List<Member> getNotCoWorkers(Long projectId) {
        return memberDao.getNotCoworkers(projectId);
    }

    public List<Member> getAllMemberWhoIsNotCoWorker(Long projectId) {
        return getNotCoWorkers(projectId);
    }

//    public List<Member> getALLMemberWoIsCoworker() {
//        return getAllMember();
//    }

    public void setMemberToCoWorker(Long id, String leader) {
        Member member = memberDao.getMemberById(id);
        Project project = projectDao.getProjectById(id);
        List<Project> coWorkerProjects = member.getCoWorkerProjects();
        coWorkerProjects.add(project);
        member.setCoWorkerProjects(coWorkerProjects);
        memberDao.saveMember(member);
        List<Member> coWorkers = project.getMembers();
        coWorkers.add(member);
        project.setMembers(coWorkers);
        projectDao.save(project);

    }
}
