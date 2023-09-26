package com.codecool.circles.controller;

import com.codecool.circles.service.MemberService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class MemberController {
    @Data
    private static class CreateUserRequest {
        private String username;
        private String password;
    }

    private MemberService memberService;

    @Autowired

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/")
    public ResponseEntity<Object> authenticateMember(@RequestBody CreateUserRequest createUserRequest) {
      return null;
        }

}
