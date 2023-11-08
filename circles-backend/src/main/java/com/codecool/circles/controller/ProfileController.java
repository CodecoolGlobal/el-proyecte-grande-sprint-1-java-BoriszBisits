package com.codecool.circles.controller;

import com.codecool.circles.model.InterestType;
import com.codecool.circles.model.Member;
import com.codecool.circles.model.Task;
import com.codecool.circles.service.MemberService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ProfileController {
    @Data
    private static class RequestData{
        private String username;
    }
    @Data
    private static class RequestDataInterest{
        private String interest;
        private String user;
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

    @PostMapping("/profile/type")
    public ResponseEntity<Object> addNewInterest( @RequestBody RequestDataInterest data) {
        System.out.println("interest " + data.interest);
        System.out.println("uuser " + data.user);

        return new ResponseEntity<>("result successful result",
                HttpStatus.OK);
    }





}
