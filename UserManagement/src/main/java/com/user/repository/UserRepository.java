package com.user.repository;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import com.user.dto.SignUpRequest;
import com.user.dto.User;

@Repository
public class UserRepository {

//	@Autowired
//	RestTemplate restTemplate; // For making an API call to a service to fetch and save users data

	// Code only for testing
	Map<String, User> map = new HashMap<String, User>();

	@Autowired
	PasswordEncoder encoder;

	public User findUserByUserName(String userName) {

		User user = new User();
		user.setPassword(encoder.encode("john"));
		user.setUserName(userName);
		map.put(userName, user);

		return map.get(userName);
	}

//	public User findUserByEmailId(String emailId) {
//
//		return null;
//	}

	public User registerUser(User user) {

		map.put(user.getUserName(), user);
		return user;
	}

//	public boolean authenticateUser(LoginRequest loginRequest) {
//
//		return false;
//	}

}
