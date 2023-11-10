package com.codecool.circles.controller;

import com.codecool.circles.model.*;
import com.codecool.circles.service.MemberService;
import com.codecool.circles.service.SubTypeService;
import com.codecool.circles.service.TypeService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class ProfileController {

    @Data
    private static class RequestDataInterest{
        private String interest;
        private String user;
        private List<Type> selectedTypes;
        private String subtype;

    }
    private MemberService memberService;
    private TypeService typeService;
    private SubTypeService subTypeService;
    @Autowired
    public ProfileController(MemberService memberService, TypeService typeService, SubTypeService subTypeService) {
        this.memberService = memberService;
        this.typeService = typeService;
        this.subTypeService = subTypeService;
    }





    @GetMapping("/profile/{username}")
    public Member getProfileByID(@PathVariable String username) {


        System.out.println("cica"+username);


        return  memberService.getMemberByName(username);
    }

    @GetMapping("/profile/types")
    public List<Type> getAllType() {
        return typeService.getAllType();
    }


    @PostMapping("/profile/type")
    public Member addNewInterest(@RequestBody RequestDataInterest data) {
       // System.out.println("interest " + data.interest);
        // System.out.println("user " + data.user);
        memberService.setMemberType(data.user, data.interest);
        return memberService.getMemberByName(data.user);
    }
    ///api/profile/subtypes
    @PostMapping("/profile/subtypes")
    public List<SubType> getSubtypeyByUsesTypes(@RequestBody RequestDataInterest data) {
       List<Type> selectedTypes = data.selectedTypes;

        List<Long>typeIds=new ArrayList<>();
        for (Type type:selectedTypes){
            typeIds.add(type.getId());

        }
        return subTypeService.getSubtypesByTypeIds(typeIds);
    }
    @PostMapping("/profile/addsubtype")
    public void getMembersSubtypes(@RequestBody RequestDataInterest data) {
        System.out.println(data.subtype);
        System.out.println(data.user);
         memberService.addSubTypeToMember(data.subtype, data.user);;

    }





}
