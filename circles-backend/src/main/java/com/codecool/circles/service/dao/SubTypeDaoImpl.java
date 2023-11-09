package com.codecool.circles.service.dao;

import com.codecool.circles.model.SubType;
import com.codecool.circles.repositories.SubTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public class SubTypeDaoImpl implements SubTypeDao {
    private SubTypeRepository subTypeRepository;

    @Autowired
    public SubTypeDaoImpl(SubTypeRepository subTypeRepository) {
        this.subTypeRepository = subTypeRepository;
    }

    @Override
    public List<SubType> getAllSubTypes() {
        return subTypeRepository.findAll();
    }

    @Override
    public SubType getSubtypeByName(String SubtypeName) {
        return subTypeRepository.findSubTypeByName(SubtypeName);
    }
}
