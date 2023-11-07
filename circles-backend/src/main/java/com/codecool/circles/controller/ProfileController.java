package com.codecool.circles.controller;

import com.codecool.circles.model.InterestType;
import com.codecool.circles.model.Member;
import com.codecool.circles.model.Task;
import com.codecool.circles.service.MemberService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ProfileController {
    @Data
    private static class RequestData{
        private String username;
    }
    @Autowired
    public ProfileController(MemberService memberService) {
        this.memberService = memberService;
    }

    private MemberService memberService;
    @GetMapping("/profile/{username}")
    public Member getProfileByID(@PathVariable String username) {


        System.out.println("cica"+username);


        return  memberService.getMemberByName(username);
    }

    @GetMapping("/profile/types")
    public  List<InterestType> getAllType() {
        System.out.println("types" + List.of(InterestType.values()));
        return List.of(InterestType.values());
    }





}
