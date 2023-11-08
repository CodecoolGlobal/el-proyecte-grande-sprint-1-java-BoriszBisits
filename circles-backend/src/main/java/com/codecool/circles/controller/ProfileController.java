package com.codecool.circles.controller;

import com.codecool.circles.model.*;
import com.codecool.circles.service.MemberService;
import com.codecool.circles.service.TypeService;
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
    private static class RequestDataInterest{
        private String interest;
        private String user;
    }
    private MemberService memberService;
    private TypeService typeService;
    @Autowired
    public ProfileController(MemberService memberService ,TypeService typeService) {
        this.memberService = memberService;
        this.typeService =typeService;
    }


    @GetMapping("/profile/{username}")
    public Member getProfileByID(@PathVariable String username) {


        System.out.println("cica"+username);


        return  memberService.getMemberByName(username);
    }

    @GetMapping("/profile/types")
    public List<Type> getAllType() {
       List<Type> types=typeService.getAllType();
        System.out.println("Kiolvasás eredmánye a type tűblűbol");
       for (Type type:types){

           System.out.println(type.getName());
           for (SubType subType:type.getSubTypes()){
               System.out.println(subType.getName());

           }
       }
        return typeService.getAllType();
    }

    @PostMapping("/profile/type")
    public ResponseEntity<Object> addNewInterest( @RequestBody RequestDataInterest data) {
        System.out.println("interest " + data.interest);
        System.out.println("uuser " + data.user);

        memberService.setMemberType(data.user, data.interest);


        return new ResponseEntity<>("result successful result",
                HttpStatus.OK);
    }





}
