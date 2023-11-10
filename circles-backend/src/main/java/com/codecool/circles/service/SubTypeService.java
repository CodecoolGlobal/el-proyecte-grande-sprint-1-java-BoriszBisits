package com.codecool.circles.service;

import com.codecool.circles.model.SubType;
import com.codecool.circles.service.dao.ProjectDao;
import com.codecool.circles.service.dao.SubTaskDao;
import com.codecool.circles.service.dao.SubTypeDao;
import com.codecool.circles.service.dao.TypeDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SubTypeService {
    private TypeDao typeDao;
    private SubTypeDao subTypeDao;
    private ProjectDao projectDao;
    @Autowired
    public SubTypeService(TypeDao typeDao, SubTypeDao subTypeDao, ProjectDao projectDao) {
        this.typeDao = typeDao;
        this.subTypeDao = subTypeDao;
        this.projectDao = projectDao;
    }




    public List<SubType> getSubtypesByTypeId(Long typeId){
        List<SubType>subTypes=subTypeDao.getAllSubTypes();
        return subTypes.stream().filter(subType -> subType.getParentType().getId().equals(typeId)).toList();
    }
    public List<SubType>getSubtypesByTypeIds(List<Long> ids){
        List<SubType>subTypes=new ArrayList<>();
        for (Long id:ids){
            subTypes.addAll(getSubtypesByTypeId(id));
            System.out.println("egy type id subtypjai"+getSubtypesByTypeId(id));
        }
        return subTypes;
    }
public List<SubType> getSubtypesByProjectId(String id){
        String projectsTypeName=projectDao.getProjectById(Long.valueOf(id)).getType();
        List<SubType>subtypes=typeDao.getTypeByName(projectsTypeName).getSubTypes();
    System.out.println(subtypes);
    return subtypes;


}


}
