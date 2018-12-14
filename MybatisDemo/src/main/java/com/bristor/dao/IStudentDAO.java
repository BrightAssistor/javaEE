package com.bristor.dao;

import java.util.List;

import com.bristor.entity.Student;

public interface IStudentDAO {
	 /**
     * 查询所有
     * @return
     */
    public  List<Student> getAll();

    /**
     * 新增
     * @param student
     * @return
     */
    public int addStudent(Student student) throws Exception;
	 /**
     * 查询所有
     * @return
     */
    public  List<Student> getcursor();
}
