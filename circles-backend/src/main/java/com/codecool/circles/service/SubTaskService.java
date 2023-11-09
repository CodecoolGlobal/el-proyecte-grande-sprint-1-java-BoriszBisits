package com.codecool.circles.service;


import com.codecool.circles.model.Member;
import com.codecool.circles.model.SubTask;
import com.codecool.circles.model.Task;
import com.codecool.circles.service.dao.MemberDao;
import com.codecool.circles.service.dao.SubTaskDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service

public class SubTaskService {
    @Autowired
    private SubTaskDao subTaskDao;
    private MemberDao memberDao;


    @Autowired
    public SubTaskService(SubTaskDao subTaskDao, MemberDao memberDao) {

        this.subTaskDao = subTaskDao;
        this.memberDao = memberDao;
    }

    public List<Member> getWorkersOnSubtask(Long projectId, Long taskId, Long subTaskId) {
        return memberDao.getSubTaskWorkers(projectId, taskId, subTaskId);
    }

    public void addMemberToSubtask(Long subTaskId, Long memberId) {
        Member member = memberDao.getMemberById(memberId);
       SubTask subTask = subTaskDao.getSubTask(subTaskId);
        subTask.addMemberToSubtaskTask(member);
        memberDao.saveMember(member);
    }

    public ResponseEntity<String> deleteSUbTaskById(Long subTaskId) {
        ResponseEntity<String> response = subTaskDao.deleteSubtaskById(subTaskId);
        return response;
    }
}
