package com.codecool.circles.service;

import com.codecool.circles.model.InterestType;
import com.codecool.circles.model.Member;
import com.codecool.circles.service.dao.MemberDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {
    private MemberDao memberDao;
    @Autowired
    public MemberService(MemberDao memberDao) {
        this.memberDao = memberDao;
    }

    public Member getMemberByName(String username){
        return memberDao.findMemberByName(username);
    }
    public  void  setMembersInterest(String member, String interest){
        getMemberByName(member).setInterestType(InterestType.valueOf(interest));

    }
}
