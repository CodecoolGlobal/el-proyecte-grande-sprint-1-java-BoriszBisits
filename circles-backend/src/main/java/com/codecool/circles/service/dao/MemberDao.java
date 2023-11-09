package com.codecool.circles.service.dao;

import com.codecool.circles.model.Member;

import java.util.List;

public interface MemberDao {
    public void saveMember(Member member);
    public void saveMembers(List<Member> memberList);

    public void populateDataBase();

    public List<Member> getNotCoworkers(Long projectId);
    public Member getMemberById(Long id);

    public Member findMemberByName(String name);

    public List<Member> getCoWorkers(Long projectId,Long taskId);

    public List<Member> getSubTaskWorkers(Long projectId,Long taskId,Long subTaskId);
}
