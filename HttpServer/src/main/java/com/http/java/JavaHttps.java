package com.http.java;

import java.io.FileInputStream;
import java.net.InetSocketAddress;
import java.security.KeyStore;

import javax.net.ssl.KeyManager;
import javax.net.ssl.SSLContext;

import com.sun.net.httpserver.HttpsConfigurator;
import com.sun.net.httpserver.HttpsServer;
import com.sun.net.ssl.KeyManagerFactory;

public class JavaHttps {

	public static void main(String[] args){
		try {
			HttpsServer htpps = HttpsServer.create(new InetSocketAddress(8080), 0);

			KeyStore ks = KeyStore.getInstance("JKS");
			ks.load(new FileInputStream("证书名"),"密码".toCharArray());

			KeyManagerFactory kmf = KeyManagerFactory.getInstance("SunX509");
			kmf.init(ks, "密码".toCharArray());

			SSLContext ssl = SSLContext.getInstance("SSLv3");//建立证书实体
			ssl.init((KeyManager[]) kmf.getKeyManagers(), null, null);

			HttpsConfigurator httpsConfigurator = new HttpsConfigurator(ssl);

			htpps.setHttpsConfigurator(httpsConfigurator);
			htpps.setExecutor(null);
			htpps.createContext("/javaHttps",new MyHandler());
			htpps.start();
		}catch (Exception e) {
			// TODO: handle exception
		}
	}
}
