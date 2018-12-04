package com.bristor.demo;

import org.eclipse.jetty.server.Server;

public class TestJetty {

	public static void main(String[] args) throws Exception {
		// TODO Auto-generated method stub
		Server server = new Server(8989);
        server.setHandler(new TestJettyHandler());
        server.start();
        server.join();;;
	}

}
