package com.codecool.circles.service.dao;

import com.codecool.circles.model.Member;
import com.codecool.circles.repositories.MemberRepository;

import java.util.List;

public interface MemberDao {
    public void saveMember(Member member);
    public void saveMembers(List<Member> memberList);
}
