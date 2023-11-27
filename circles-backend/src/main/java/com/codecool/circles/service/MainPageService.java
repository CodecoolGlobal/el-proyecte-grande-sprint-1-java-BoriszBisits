package com.codecool.circles.service;

import com.codecool.circles.model.*;
import com.codecool.circles.service.dao.MainPageDao;
import com.codecool.circles.service.dao.MemberDao;
import com.codecool.circles.service.dao.ProjectDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;


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
        List<Project> ownedProjects = mainPageDao.getProjects().stream().filter(project -> project.getLeader().equals(leader)).toList();
        //checkProjectIsCompleted(ownedProjects);
        return ownedProjects;
    }

//    public void checkProjectIsCompleted(List<Project> projectList) {
//        for (Project project : projectList) {
//            project.checkCompleted();
//        }
//    }

    public List<Project> getProjectsWhereIAmACoWorker(String worker) {
        Member member = memberDao.findMemberByName(worker);
        List<Project> projectsWhereIAmACoWorker = mainPageDao.getProjects().stream().filter(project -> project.getMembers().contains(member)).toList();
        //checkProjectIsCompleted(projectsWhereIAmACoWorker);
        return projectsWhereIAmACoWorker;
    }

    public void addNewProjects(Project project) {

        projectDao.save(project);
        Member member = memberDao.findMemberByName(project.getLeader());

        //List<Project> ownedProjects = member.getOwnedProjects();
        member.addOwnProject(project);
        //System.out.println("projekjei az embernek meg az uj projectt" + ownedProjects);
        //member.setOwnedProjects(ownedProjects);
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
        List<Member> members = getNotCoWorkers(projectId);
        String type = projectDao.getProjectById(projectId).getType();
        List<Member> filteredMembers = new ArrayList<>();

        for (Member member : members) {
            Set<Type> typesOfMember = member.getTypes();
            List<String> nameOfTypes = new ArrayList<>();
            for (Type type1 : typesOfMember) {
                nameOfTypes.add(type1.getName());
            }
            if (nameOfTypes.contains(type)) {
                filteredMembers.add(member);
            }

        }

        return filteredMembers;
    }

//    public List<Member> getALLMemberWoIsCoworker() {
//        return getAllMember();
//    }

    public void setMemberToCoWorker(Long projectId, String leader, Long memberId) {
        Member member = memberDao.getMemberById(memberId);
        Project project = projectDao.getProjectById(projectId);
        project.addMemberToProject(project, member);
        memberDao.saveMember(member);
    }

    public ResponseEntity<String> deleteProjectById(Long projectId) {

        ResponseEntity<String> response = mainPageDao.deleteProjectById(projectId);
        return response;
    }
}
