package com.codecool.circles.service;

import com.codecool.circles.model.*;
import com.codecool.circles.service.dao.MemberDao;
import com.codecool.circles.service.dao.ProjectDao;
import com.codecool.circles.service.dao.SubTypeDao;
import com.codecool.circles.service.dao.TypeDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class MemberService {
    private MemberDao memberDao;
    private ProjectDao projectDao;
    private TypeDao typeDao;
    private SubTypeDao subTypeDao;
@Autowired
    public MemberService(MemberDao memberDao, ProjectDao projectDao, TypeDao typeDao, SubTypeDao subTypeDao) {
        this.memberDao = memberDao;
        this.projectDao = projectDao;
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

    public List<Member> getAllCoworkers(String leader) {
        List<Project> allProjects = projectDao.getAllProjects();
        List<Member> members = new ArrayList<>();

        for (Project project : allProjects) {
            if (project.getLeader().equals(leader)) {
                addUniqueMembers(members, project.getMembers());
            } else {

                for (Member member : project.getMembers()) {
                    if (member.getName().equals(leader)) {
                        addUniqueMembers(members, project.getMembers());
                        members.add(memberDao.findMemberByName(project.getLeader()));
                        break;
                    }
                }
            }
        }

        return members;
    }

    private void addUniqueMembers(List<Member> destination, List<Member> source) {
        for (Member member : source) {
            if (!destination.contains(member)) {
                destination.add(member);
            }
        }
    }

}
