package com.codecool.circles.service.dao;

import com.codecool.circles.model.Member;
import com.codecool.circles.repositories.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.Access;
import java.util.List;

@Repository
public class MemberDaoImpl implements MemberDao{
    private MemberRepository memberRepository;
    @Autowired
    public MemberDaoImpl(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public void saveMember(Member member) {
        memberRepository.save(member);
    }

    @Override
    public void saveMembers(List<Member> memberList) {

        memberRepository.saveAll(memberList);
    }

}


