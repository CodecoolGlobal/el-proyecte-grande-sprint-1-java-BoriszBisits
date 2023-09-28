package com.codecool.circles.repositories;

import com.codecool.circles.model.SubTask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubTaskRepository extends JpaRepository<SubTask, Long> {
}
