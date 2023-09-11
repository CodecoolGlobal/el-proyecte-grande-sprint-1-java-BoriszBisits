package com.codecool.circles.service.dao;

import com.codecool.circles.model.Project;
import com.codecool.circles.model.Task;
import com.codecool.circles.model.Member;
import com.codecool.circles.model.storage.Storage;
import com.codecool.circles.repositories.ProjectRepository;
import com.codecool.circles.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
@Repository



public class ProjectDaoImpl implements ProjectDao {

private ProjectRepository projectRepository;


@Autowired
    public ProjectDaoImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;

    }





    @Override
    public void addUser(Long projectId , Member member) {
        getProjectById(projectId).addUser(member);
    }

    @Override
    public void addUsers(Long projectId, List<Member> member) {
        getProjectById(projectId).addUsers(member);
    }

    @Override
    public List<Task> getAllTasks(Long projectId) {
        System.out.println("daoimpl" + projectId);
      return   getProjectById(projectId).getAllTask();
    }

    @Override
    public void addTask(Task task) {
        System.out.println("id" + task.getId());
        ;
        System.out.println(task.getDeadLine());
        System.out.println("user" + task.getMembers());
        task.setDeadLine(LocalDate.now());
        if (task.getMembers()==null){
            task.setMembers(new ArrayList<>());
        }

        getProjectById(task.getId()).addTask(task);
        List<Task> projectTasks=getProjectById(task.getId()).getAllTask();
        for (Task task1:projectTasks){
            System.out.println(task1.getName());
        }
    }

    public Project getProjectById(Long projectId) {
        return (Project) projectRepository.findAllById(Collections.singleton(projectId));
    }


}
