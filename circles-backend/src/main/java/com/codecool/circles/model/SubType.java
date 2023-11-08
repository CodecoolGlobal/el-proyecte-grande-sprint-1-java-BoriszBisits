package com.codecool.circles.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class SubType {
    public SubType() {
        // Default constructor
    }

    public SubType(String name, Type parentType) {
        this.name = name;
        this.parentType = parentType;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne    @JsonIgnore
    private Type parentType;

    // Getters and setters
}
