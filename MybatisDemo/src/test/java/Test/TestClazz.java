package Test;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Before;
import org.junit.Test;

import com.bristor.dao.ClazzDao;
import com.bristor.entity.Clazz;

public class TestClazz {
	private SqlSession session;

	@Before
	public void init() {
		SqlSessionFactoryBuilder ssfb = new SqlSessionFactoryBuilder();
		SqlSessionFactory ssf = ssfb.build(TestClazz.class.getClassLoader()
				.getResourceAsStream("mybatis-config.xml"));
		session = ssf.openSession();
	}

	@Test
	public void test1() {
		/**
		 * getMapper方法返回一个符合 Mapper映射器(EmpDAO)要求的 对象。
		 */
		try {
			
			Clazz clazz = new Clazz();
			clazz.setClassname("甲");
			clazz.setCount(40);
			//两种方式
//			ClazzDao dao = session.getMapper(ClazzDao.class);
//			int insert = dao.insert(clazz);
//			System.out.println("成功数："+insert);
			// 仍然需要提交事务
			int insert = session.insert("com.bristor.dao.ClazzDao.insert", clazz);
			System.out.println("成功数："+insert);
			session.commit();
			session.close();
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		}
	}

	@Test
	public void test2() {
		ClazzDao dao = session.getMapper(ClazzDao.class);
		List<Clazz> emps = dao.getAll();
		System.out.println("list："+emps.size()+";"+emps);
		session.close();
	}
}
