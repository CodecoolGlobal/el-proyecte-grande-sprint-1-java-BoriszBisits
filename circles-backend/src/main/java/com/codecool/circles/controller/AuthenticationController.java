package com.codecool.circles.controller;

import com.codecool.circles.model.Member;
import com.codecool.circles.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ){
        AuthenticationResponse responseEntity=service.register(request);

        if(responseEntity.getToken().equals("fail")){
            System.out.println("registerRequest with John Doe");
            RegisterRequest registerRequest=new RegisterRequest();
            registerRequest.setName("This username is already in use");
            registerRequest.setPassword("This username is already in use");
            registerRequest.setEmail("This username is already in use");
            return ResponseEntity.ok(responseEntity);
        }else {
            System.out.println("else ág");
            return ResponseEntity.ok(responseEntity);
        }
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody RegisterRequest request
    ){
        return ResponseEntity.ok(service.authenticate(request));
    }
}
