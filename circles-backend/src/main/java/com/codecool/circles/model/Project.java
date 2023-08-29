package com.codecool.circles.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Project {

    @JsonProperty("name")
    private String name;

    public Project(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
