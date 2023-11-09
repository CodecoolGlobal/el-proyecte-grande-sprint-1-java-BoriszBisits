package com.codecool.circles.repositories;

import com.codecool.circles.model.Project;
import com.codecool.circles.model.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TypeRepository extends JpaRepository<Type, Long> {

    @Query("SELECT t FROM Type t WHERE t.name = :name")
    Type findTypeByName(@Param("name") String name);



}
