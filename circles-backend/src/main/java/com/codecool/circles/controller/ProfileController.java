package com.codecool.circles.controller;

import com.codecool.circles.model.*;
import com.codecool.circles.service.MemberService;
import com.codecool.circles.service.NoteService;
import com.codecool.circles.service.SubTypeService;
import com.codecool.circles.service.TypeService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Base64;
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

    @Data
    public static class ProfilePictureData{
        private String profilePictureUrl;
    }

    @Data
    public static class ChangeUsernameData {
        private String newUsername;
    }

    @Data
    public static class ChangeEmailData {
        private String newEmail;
    }

    @Data
    public static class ChangePasswordData {
        private String newPassword;
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

    @PostMapping("/profile/picture/upload/{leader}")
    public ResponseEntity<String> uploadProfilePicture(
            @PathVariable String leader,
            @RequestParam("file") MultipartFile file) {

        try {
            String message = memberService.uploadProfilePicture(leader, file);
            return ResponseEntity.ok(message);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception for debugging
            return ResponseEntity.status(500).body("Error uploading profile picture");
        }
    }

    @GetMapping("/profile/picture/{leader}")
    public ResponseEntity<String> getProfilePicture(@PathVariable String leader) {
        byte[] profilePicture = memberService.getProfilePictureBytes(leader);

        if (profilePicture == null || profilePicture.length == 0) {
            return ResponseEntity.notFound().build();
        }

        String base64Image = Base64.getEncoder().encodeToString(profilePicture);

        return ResponseEntity.ok()
                .body(base64Image);
    }

    @PutMapping("/profile/changeusername/{leader}")
    public ResponseEntity<String> changeUsername(
            @PathVariable String leader,
            @RequestBody ChangeUsernameData data) {
        try {
            memberService.changeUserName(leader, data.getNewUsername());
            return ResponseEntity.ok("Username changed successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error changing username");
        }
    }

    @PutMapping("/profile/changeemail/{leader}")
    public ResponseEntity<String> changeEmail(
            @PathVariable String leader,
            @RequestBody ChangeEmailData data) {
        try {
            memberService.changeEmail(leader, data.getNewEmail());
            return ResponseEntity.ok("Email address changed successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error changing email address");
        }
    }

    @PutMapping("/profile/changepassword/{leader}")
    public ResponseEntity<String> changePassword(
            @PathVariable String leader,
            @RequestBody ChangePasswordData data) {
        try {
            memberService.changePassword(leader, data.getNewPassword());
            return ResponseEntity.ok("Password changed successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error changing password");
        }
    }


}
