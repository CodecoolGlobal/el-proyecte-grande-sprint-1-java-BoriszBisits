package com.codecool.circles.service.dao;

import com.codecool.circles.model.Member;
import com.codecool.circles.repositories.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.*;

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
    public List<Member> getAllMember() {
        return memberRepository.findAll();
    }

    @Override
    public Member getMemberById(Long id) {
        return memberRepository.findById(id).get();
    }

    public void setCoworker(Long id){
        Member member = getMemberById(id);
        memberRepository.save(member);
    }

    @Override
    public Member findMemberByName(String name) {
        return memberRepository.findMemberByName(name);
    }
}
