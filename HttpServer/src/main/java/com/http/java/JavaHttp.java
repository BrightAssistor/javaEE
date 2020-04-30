package com.http.java;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

public class JavaHttp {
	public static void main(String[] args) {
		try {
			HttpServer httpServer = HttpServer.create(new InetSocketAddress(8080), 0);
			httpServer.createContext("/javaHttp",new MyHandler());
			httpServer.setExecutor(null);
			httpServer.start();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
class MyHandler implements HttpHandler{

	@Override
	public void handle(HttpExchange t) throws IOException {
		InputStream requestBody = t.getRequestBody();
		String response = "<font color='#ff0000'>come on baby</font>";
		t.sendResponseHeaders(200, response.length());
		OutputStream os = t.getResponseBody();
		os.write(response.getBytes());
		os.close();

	}

}