package com.codecool.circles.service.dao;

import com.codecool.circles.model.Type;
import com.codecool.circles.repositories.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public class TypeDaoImpl implements  TypeDao{
    private TypeRepository typeRepository;
    @Autowired
    public TypeDaoImpl(TypeRepository typeRepository) {
        this.typeRepository=typeRepository;
    }

    @Override
    public List<Type> getTypes() {
        return typeRepository.findAll();
    }

    @Override
    public Type getTypeByName(String typename) {
        return typeRepository.findTypeByName(typename);
    }
}
