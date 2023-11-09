package com.codecool.circles.repositories;

import com.codecool.circles.model.SubType;
import com.codecool.circles.model.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SubTypeRepository extends JpaRepository<SubType, Long> {

    @Query("SELECT st FROM SubType st WHERE st.name = :name")
    SubType findSubTypeByName(@Param("name") String name);
}
