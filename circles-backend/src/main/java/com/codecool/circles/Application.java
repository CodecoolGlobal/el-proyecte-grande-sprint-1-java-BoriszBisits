package com.codecool.circles;

import com.codecool.circles.service.dao.MemberDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
//@EntityScan("com.codecool.circles.model")
public class Application implements CommandLineRunner {
    private MemberDao memberDao;

    @Autowired
    public Application(MemberDao memberDao) {
        this.memberDao = memberDao;
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class,args);
    }

    @Override
    public void run(String... args) throws Exception {
        //memberDao.populateDataBase();
    }
}
