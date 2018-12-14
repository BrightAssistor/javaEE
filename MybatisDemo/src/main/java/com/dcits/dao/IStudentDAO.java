package com.dcits.dao;

import java.util.List;

import com.dcits.entity.Student;

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
