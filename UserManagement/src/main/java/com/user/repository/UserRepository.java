package com.user.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import com.user.dto.User;

@Repository
public class UserRepository {

	@Autowired
	PasswordEncoder encoder;

	public User findUserByUserName(String userName) {

		// API Call to DataStorageService to fetch the user from DB
		return null;
	}

	public User registerUser(User user) {

		// API Call to DataStorageService for storing User's info in DB
		return null;
	}

}
