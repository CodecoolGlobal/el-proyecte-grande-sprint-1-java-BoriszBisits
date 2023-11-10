package com.codecool.circles.service.dao;

import com.codecool.circles.model.SubType;
import com.codecool.circles.model.Type;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;

public interface TypeDao {
    public List<Type> getTypes();

    public Type getTypeByName(String typename);


}
