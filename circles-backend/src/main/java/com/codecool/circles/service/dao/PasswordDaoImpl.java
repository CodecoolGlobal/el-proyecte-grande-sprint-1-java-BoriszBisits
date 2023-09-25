package com.codecool.circles.service.dao;

import com.codecool.circles.model.storage.Password;
import com.codecool.circles.repositories.PasswordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class PasswordDaoImpl implements PasswordDao{

    private PasswordRepository passwordRepository;
    @Autowired

    public PasswordDaoImpl(PasswordRepository passwordRepository) {
        this.passwordRepository = passwordRepository;
    }




    @Override
    public Password getPasswordById(Long id) {
        return passwordRepository.findById(id).get();
    }

    @Override
    public Password findPasswordByValue(String password) {
        return passwordRepository.findPasswordByValue(password);
    }
}
