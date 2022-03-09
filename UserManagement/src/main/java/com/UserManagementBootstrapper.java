package com;

import org.apache.catalina.core.ApplicationContext;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mongo.MongoProperties;

@SpringBootApplication
public class UserManagementBootstrapper {

	public static void main(String[] args) {
		SpringApplication.run(UserManagementBootstrapper.class, args);
		
		
		
	}

}
