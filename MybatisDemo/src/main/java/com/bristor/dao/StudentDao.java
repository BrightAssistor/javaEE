package com.bristor.dao;

import java.util.List;

import com.bristor.entity.Student;

public interface StudentDao {
    public  List<Student> getAll();
    public int addStudent(Student student) throws Exception;
    public  List<Student> getcursor();
}
