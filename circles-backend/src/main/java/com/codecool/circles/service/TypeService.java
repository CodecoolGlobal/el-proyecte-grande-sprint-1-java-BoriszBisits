package com.codecool.circles.service;

import com.codecool.circles.model.Type;
import com.codecool.circles.repositories.TypeRepository;
import com.codecool.circles.service.dao.TypeDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypeService {
public TypeDao typeDao;
    @Autowired
    public TypeService(TypeDao typeDao) {
        this.typeDao = typeDao;
    }

    public List<Type> getAllType(){
        return typeDao.getTypes();
    }
}
