package com.codecool.circles.service;

import com.codecool.circles.model.InterestType;
import com.codecool.circles.model.Member;
import com.codecool.circles.model.Type;
import com.codecool.circles.service.dao.MemberDao;
import com.codecool.circles.service.dao.TypeDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class MemberService {
    private MemberDao memberDao;
    private TypeDao typeDao;
    @Autowired
    public MemberService(MemberDao memberDao ,TypeDao typeDao ) {
        this.memberDao = memberDao;
        this.typeDao = typeDao;
    }

    public Member getMemberByName(String username){
        return memberDao.findMemberByName(username);
    }

    public void setMemberType(String username,String type){
        Member member =getMemberByName(username);
        Type membersType=typeDao.getTypeByName(type);
        System.out.println("My Type in Service  "+membersType);
        Set<Type>types=member.getTypes();
        types.add(membersType);
        member.setTypes(types);
        memberDao.saveMember(member);
        System.out.println(member.getTypes());
    }
    public  void  setMembersInterest(String member, String interest){
        getMemberByName(member).setInterestType(InterestType.valueOf(interest));

    }
}
