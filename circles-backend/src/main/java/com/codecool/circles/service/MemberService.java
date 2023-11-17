package com.codecool.circles.service;

import org.springframework.security.core.Authentication;
import com.codecool.circles.model.*;
import com.codecool.circles.service.dao.MemberDao;
import com.codecool.circles.service.dao.ProjectDao;
import com.codecool.circles.service.dao.SubTypeDao;
import com.codecool.circles.service.dao.TypeDao;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
//import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class MemberService {
    private MemberDao memberDao;
    private ProjectDao projectDao;
    private TypeDao typeDao;
    private SubTypeDao subTypeDao;
    private MemberDetailsService memberDetailsService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public MemberService(MemberDao memberDao, ProjectDao projectDao, TypeDao typeDao, SubTypeDao subTypeDao, MemberDetailsService memberDetailsService, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder) {
        this.memberDao = memberDao;
        this.projectDao = projectDao;
        this.typeDao = typeDao;
        this.subTypeDao = subTypeDao;
        this.memberDetailsService = memberDetailsService;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }


    public Member getMemberByName(String username) {
        return memberDao.findMemberByName(username);
    }

    public void setMemberType(String username, String type) {
        Member member = getMemberByName(username);
        Type membersType = typeDao.getTypeByName(type);
        System.out.println("My Type in Service  " + membersType);
        Set<Type> types = member.getTypes();
        types.add(membersType);
        member.setTypes(types);
        memberDao.saveMember(member);
        System.out.println(member.getTypes());
    }

    public void setMembersInterest(String member, String interest) {
        getMemberByName(member).setInterestType(InterestType.valueOf(interest));

    }

    public void addSubTypeToMember(String subtypeName, String memberName) {
        Member member = memberDao.findMemberByName(memberName);
        System.out.println("ember" + member.getName());
        SubType subType = subTypeDao.getSubtypeByName(subtypeName);
        System.out.println("subtipe-----------------" + subType.getName());
        Set<SubType> subTypes = member.getSubTypes();
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

    public String uploadProfilePicture(String userName, MultipartFile file) throws IOException {
        Member member = memberDao.findMemberByName(userName);

        System.out.println("Received file size: " + file.getSize() + " bytes");

        try (InputStream inputStream = file.getInputStream()) {
            byte[] bytes = IOUtils.toByteArray(inputStream);

            member.setProfilePictureImage(bytes);
            memberDao.saveMember(member);

            return "Profile picture uploaded successfully";
        } catch (IOException e) {
            e.printStackTrace();
            return "Error uploading profile picture";
        }
    }

    @Transactional
    public byte[] getProfilePictureBytes(String userName) {
        return memberDao.findMemberByName(userName).getProfilePictureImage();
    }

    public void changeUserName(String user, String newUserName) {
        Member member = memberDao.findMemberByName(user);
        member.setName(newUserName);
        memberDao.saveMember(member);
    }

    public void changeEmail(String user, String newEmailAddress) {
        Member member = memberDao.findMemberByName(user);
        member.setEmail(newEmailAddress);
        memberDao.saveMember(member);
    }

    public void changePassword(String user, String newPassword) {
        Member member = memberDao.findMemberByName(user);
        member.setPassword(passwordEncoder.encode(newPassword));
        memberDao.saveMember(member);

        // Force re-authentication
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, newPassword);
        Authentication authenticated = authenticationManager.authenticate(authentication);
        SecurityContextHolder.getContext().setAuthentication(authenticated);
    }

}
