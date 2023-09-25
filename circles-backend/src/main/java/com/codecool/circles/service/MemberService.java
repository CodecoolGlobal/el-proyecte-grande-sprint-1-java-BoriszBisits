package com.codecool.circles.service;

import com.codecool.circles.model.Member;
import com.codecool.circles.model.storage.Password;
import com.codecool.circles.service.dao.MemberDao;
import com.codecool.circles.service.dao.PasswordDao;
import com.codecool.circles.service.dao.PasswordDaoImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {
    private MemberDao memberDao;

    private PasswordDao passwordDao;

    @Autowired

    public MemberService(MemberDao memberDao, PasswordDao passwordDao) {
        this.memberDao = memberDao;
        this.passwordDao = passwordDao;
    }

    public boolean authenticateMember(String memberName, String password) {
        Member member = memberDao.findMemberByName(memberName);
        Password password1 = passwordDao.findPasswordByValue(password);


        if(member.getPassword().getId().equals(password1.getId())){

            return true;
        } else {
            return false;
        }
    }
}
