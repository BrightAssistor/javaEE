package Test;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.ibatis.cursor.Cursor;
import org.apache.ibatis.session.SqlSession;
import org.junit.Test;

import com.bristor.dao.StudentDao;
import com.bristor.entity.Student;
import com.bristor.utils.SessionUtils;

public class TestStudent {

	@Test
    /**
     * 查询
     */
    public void getAll(){
		try {
			SqlSession session = SessionUtils.getSqlSession();
			StudentDao mapper = session.getMapper(StudentDao.class);
			List<Student> all = mapper.getAll();
			session.commit();
			session.close();
			for (Student item:all){
				System.out.println(item.getName());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
    }
	@Test
    /**
     * 新增
     * @throws Exception
     */
    public void inserts(){
    	try {
    		SqlSession session = SessionUtils.getSqlSession();
    		Student student=new Student();
    		student.setName("关羽333");
//    		int count = session.insert("com.bristor.dao.IStudentDAO.addStudent",student);
//    		System.out.println(count);
    		StudentDao mapper = session.getMapper(StudentDao.class);
    		int addStudent = mapper.addStudent(student);
    		System.out.println(addStudent);
    		session.commit();
    		session.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
    }
	
	@Test
    /**
     * 查询cursor
     */
    public void getcursor(){
		List<Student> results = new ArrayList<Student>();
		try {
			SqlSession session = SessionUtils.getSqlSession();
			Cursor<Student> selectCursor = session.selectCursor("getcursor");
			Iterator<Student> iterator = selectCursor.iterator();
			while (iterator.hasNext()) {
					results.add((Student)iterator.next());
				
			}
			session.commit();
			session.close();
			
			
			for (int i = 0; i < results.size(); i++) {
				
				System.out.println(results.get(i));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
    }
}
