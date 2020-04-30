package com.bristor.web;

import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.ContextHandler;
import org.eclipse.jetty.server.handler.ContextHandlerCollection;

public class Test {

	public static void main(String[] args) {
		Server server = new Server(8989);

		ContextHandler login = new ContextHandler();
		login.setContextPath("/");
		login.setHandler(new LoginHander());

		ContextHandler query = new ContextHandler();
		query.setContextPath("/query");
		query.setHandler(new QueryHander());

		ContextHandlerCollection collection = new ContextHandlerCollection();
		collection.setHandlers(new Handler[]{login,query});

		server.setHandler(collection);

		try {
			server.start();
			System.out.println("system start successful");
			server.join();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
