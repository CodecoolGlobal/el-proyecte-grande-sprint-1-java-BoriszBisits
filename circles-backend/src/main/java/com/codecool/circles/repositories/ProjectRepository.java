package com.codecool.circles.repositories;

import com.codecool.circles.model.Member;
import com.codecool.circles.model.Project;
import org.springframework.boot.autoconfigure.data.jpa.JpaRepositoriesAutoConfiguration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProjectRepository extends JpaRepository <Project , Long>{

    @Query("SELECT p FROM Project p WHERE p.name = :name")
    Project findProjectByName(@Param("name") String name);

}
