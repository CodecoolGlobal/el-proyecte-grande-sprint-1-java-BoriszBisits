package com.codecool.circles.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@Entity
public class Note {
    @Id
    private UUID id=UUID.randomUUID();
    private String massege;
    @ManyToOne
    private Member sender;
    @ManyToOne
    private Member reciverMember;
    @ManyToOne
    private  Project reciverProject;
    private boolean isNew=false ;

    private LocalDate date;



}
