package com.bristor.dao;

import java.util.List;

import com.bristor.entity.Clazz;

public interface ClazzDao {
    int deleteByPrimaryKey(Integer id);

    int insert(Clazz record);

    int insertSelective(Clazz record);

    Clazz selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Clazz record);

    int updateByPrimaryKey(Clazz record);
    
    List<Clazz> getAll();
}