package com.codecool.circles.service.dao;

import com.codecool.circles.model.Member;
import com.codecool.circles.model.Project;
import com.codecool.circles.model.SubTask;
import com.codecool.circles.model.Task;
import com.codecool.circles.repositories.MemberRepository;
import com.codecool.circles.repositories.ProjectRepository;
import com.codecool.circles.repositories.SubTaskRepository;
import com.codecool.circles.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class MemberDaoImpl implements MemberDao{
    private MemberRepository memberRepository;
    private ProjectRepository projectRepository;
    private TaskRepository taskRepository;
    private SubTaskRepository subTaskRepository;
    @Autowired
    public MemberDaoImpl(MemberRepository memberRepository,
                         ProjectRepository projectRepository,
                         TaskRepository taskRepository,
                         SubTaskRepository subTaskRepository) {
        this.memberRepository = memberRepository;
        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
        this.subTaskRepository = subTaskRepository;
    }

    @Override
    public void saveMember(Member member) {
        memberRepository.save(member);
    }

    @Override
    public void saveMembers(List<Member> memberList) {

        memberRepository.saveAll(memberList);
    }

    public void populateDataBase() {
        // TODO: only do this if there is no data

        Random random = new Random();

        List<String> randomFirstNames = Arrays.asList(
                "Emma", "Liam", "Olivia", "Noah", "Ava", "Isabella", "Sophia", "Mia", "Charlotte", "Amelia",
                "Harper", "Evelyn", "Abigail", "Emily", "Elizabeth", "Sofia", "Madison", "Avery", "Ella", "Scarlett",
                "Grace", "Chloe", "Victoria", "Riley", "Aria", "Lily", "Aubrey", "Zoey", "Penelope", "Addison",
                "Lillian", "Natalie", "Hannah", "Brooklyn", "Scarlett", "Leah", "Zoe", "Stella", "Hazel", "Aurora",
                "Naomi", "Violet", "Aria", "Lucy", "Eleanor", "Claire", "Samantha", "Caroline", "Genesis", "Maya"
        );

        List<String> randomLastNames = Arrays.asList(
                "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
                "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson",
                "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King",
                "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter",
                "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins"
        );
        List<Member> memberList = new ArrayList<>();

        for (int i = 0; i < 100; i++) {
            String name = randomFirstNames.get(random.nextInt(50)) + " " + randomLastNames.get(random.nextInt(50));
            Member member = new Member();
            member.setName(name);
            memberList.add(member);
        }
        memberRepository.saveAll(memberList);
    }

    @Override
    public List<Member> getNotCoworkers(Long projectId) {
        List<Member> memberList = memberRepository.findAll();

       Project project=projectRepository.findById(projectId).get();
       List<Member> filteredMemerlist=memberList.stream().filter(member -> !member.getCoProjects().contains(project) && !member.getName().equals(project.getLeader())).toList();
        return filteredMemerlist;    }


    @Override
    public Member getMemberById(Long id) {
        return memberRepository.findById(id).get();
    }




    @Override
    public Member findMemberByName(String name) {
        return memberRepository.findMemberByName(name);
    }

    @Override
    public List<Member> getCoWorkers(Long projectId,Long taskId) {
        List<Member> memberList = memberRepository.findAll();
        Project project=projectRepository.findById(projectId).get();
        Task task = taskRepository.findById(taskId).get();
        List<Member> membersOnTheProject =memberList.stream().filter(member -> member.getCoProjects().contains(project)).toList();
List<Member> membersNotOnTheTask = membersOnTheProject.stream().filter(member -> !member.getTaskList().contains(task)).toList();
        return membersNotOnTheTask;
    }

    @Override
    public List<Member> getSubTaskWorkers(Long projectId, Long taskId, Long subTaskId) {
        List<Member> memberList = memberRepository.findAll();
        Task task = taskRepository.findById(taskId).get();
        SubTask subtask = subTaskRepository.findById(subTaskId).get();
        List<Member> membersOnTask = memberList.stream().filter(member -> member.getTaskList().contains(task)).toList();
        List<Member> membersNotOnTheTask = membersOnTask.stream().filter(member -> !member.getSubTaskList().contains(subtask)).toList();

        return membersNotOnTheTask;


    }


}
