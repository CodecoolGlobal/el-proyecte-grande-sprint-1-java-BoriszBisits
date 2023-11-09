package com.codecool.circles.service;

import com.codecool.circles.model.InterestType;
import com.codecool.circles.model.Member;
import com.codecool.circles.model.SubType;
import com.codecool.circles.model.Type;
import com.codecool.circles.service.dao.MemberDao;
import com.codecool.circles.service.dao.SubTypeDao;
import com.codecool.circles.service.dao.TypeDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class MemberService {
    private MemberDao memberDao;
    private TypeDao typeDao;
    private SubTypeDao subTypeDao;
    @Autowired
    public MemberService(MemberDao memberDao, TypeDao typeDao, SubTypeDao subTypeDao) {
        this.memberDao = memberDao;
        this.typeDao = typeDao;
        this.subTypeDao = subTypeDao;
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
    public void addSubTypeToMember(String subtypeName,String memberName){
        Member member=memberDao.findMemberByName(memberName);
        System.out.println("ember"+member.getName());
        SubType subType=subTypeDao.getSubtypeByName(subtypeName);
        System.out.println("subtipe-----------------"+subType.getName());
        Set<SubType> subTypes=  member.getSubTypes();
        subTypes.add(subType);
        member.setSubTypes(subTypes);
        memberDao.saveMember(member);

    }
}
