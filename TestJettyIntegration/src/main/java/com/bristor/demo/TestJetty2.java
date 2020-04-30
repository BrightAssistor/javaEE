package com.bristor.demo;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;

public class TestJetty2 {

	public static void main(String[] args) throws Exception {
		// TODO Auto-generated method stub
		Server server = new Server(8989);
		ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        //相当于工程目录，如果是myweb，则http://localhost:port/myweb/
        context.setContextPath("/hello");
        server.setHandler(context);
//        server.setHandler(new TestJettyHandler());
        // http://localhost:8080/servlet1
        context.addServlet(new ServletHolder(new HelloServlet()), "/*");
        server.start();
        server.join();;;
	}

}
