package com.codecool.circles.repositories;

import com.codecool.circles.model.storage.Password;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PasswordRepository extends JpaRepository<Password, Long> {
    @Query("SELECT p FROM Password p WHERE p.password = :password")
    Password findPasswordByValue(@Param("password") String password);
}
