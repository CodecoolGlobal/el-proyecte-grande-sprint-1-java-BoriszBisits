package com.codecool.circles.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
@Getter
@Setter
@Entity
public class Type {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

        private String name;

    public Type(String name) {
        this.name = name;
    }
    @JsonIgnore
    @OneToMany(mappedBy = "parentType", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SubType> subTypes = new ArrayList<>();


    public Type() {

    }
}
