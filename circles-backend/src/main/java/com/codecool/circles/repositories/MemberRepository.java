package com.codecool.circles.repositories;

import com.codecool.circles.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberRepository extends JpaRepository<Member, Long> {


    @Query("SELECT m FROM Member m WHERE m.name = :name")
    Member findMemberByName(@Param("name") String name);
}
