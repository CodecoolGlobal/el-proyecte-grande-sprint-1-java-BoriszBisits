package com.codecool.circles.service.dao;

import com.codecool.circles.model.SubType;

import java.util.List;

public interface SubTypeDao {

    public List<SubType> getAllSubTypes();
    public SubType getSubtypeByName(String SubtypeName);
}
