package com.http.springboot;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/HttpServer")
public class SpringBootHttp {
	@RequestMapping(value="/sendPostData",method=RequestMethod.POST)
	public String sendPostData(HttpServletRequest request,HttpServletResponse response,@RequestBody String data) {
		System.out.println(data);

		return "good";

	}
	@RequestMapping(value="/sendGetData",method=RequestMethod.GET)
	public String sendGetData(HttpServletRequest request,HttpServletResponse response,@RequestBody String data) {
		System.out.println("bad");

		return "bad";

	}
}
