package com.codecool.circles.controller;

import com.codecool.circles.model.*;
import com.codecool.circles.service.MemberService;
import com.codecool.circles.service.NoteService;
import com.codecool.circles.service.SubTypeService;
import com.codecool.circles.service.TypeService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ProfileController {

    @Data
    public static class RequestDataInterest{
        private String interest;
        private String user;
        private List<Type> selectedTypes;
        private String subtype;
        private String receiver;
        private String sender;
        private String message;

    }
    private MemberService memberService;
    private TypeService typeService;
    private SubTypeService subTypeService;
    private NoteService noteService;

    @Autowired

    public ProfileController(MemberService memberService, TypeService typeService, SubTypeService subTypeService, NoteService noteService) {
        this.memberService = memberService;
        this.typeService = typeService;
        this.subTypeService = subTypeService;
        this.noteService = noteService;
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
    @GetMapping("/profile/allcoworkers/{leader}")
    public List<Member> getCoWorkersAllCoworkers(@PathVariable String leader) {
        System.out.println("profilename " + leader);
        return memberService.getAllCoworkers(leader);
    }
///api/profile/message/${leader}
@GetMapping("/profile/message/{leader}")
public List<Note> getMessagesOfMember(@PathVariable String leader) {
    System.out.println("profilename in massage context " + leader);
    List<Note>notes= noteService.getNotesOfMemberByName(leader);
    for (Note note:notes){
        System.out.println("note----------------------"+note.getMassege());
    }
    return noteService.getNotesOfMemberByName(leader);
}

    @PostMapping("/profile/sendmessage")
    public void addNewMassege(@RequestBody RequestDataInterest data) {
        System.out.println("---------------------------------------------");
        System.out.println("receiver"+data.receiver);
        System.out.println("sender"+data.sender);
        System.out.println("message"+data.message);


        noteService.addNewNoteForMembers(data.sender, data.receiver,data.message);
        List<Note>notes =noteService.getAllNotes();
        for (Note note:notes){
            System.out.println("------------------note----------------");
            System.out.println(note.getSender());
            System.out.println(note.getMassege());
            System.out.println(note.getReciverMember());
            System.out.println("-------------------------------------");
        }

    }




}
