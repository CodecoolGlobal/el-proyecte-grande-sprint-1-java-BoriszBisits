package com.codecool.circles.service.dao;

import com.codecool.circles.model.storage.Password;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordDao {
    public Password getPasswordById(Long id);


    public Password findPasswordByValue(String password);
}
