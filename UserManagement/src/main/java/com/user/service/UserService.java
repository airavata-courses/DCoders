package com.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.user.dto.LoginRequest;
import com.user.dto.SignUpRequest;
import com.user.dto.User;
import com.user.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	PasswordEncoder encoder;

	public User registerUser(SignUpRequest signUpRequest) {
		String userName = signUpRequest.getUserName();
		if (isUserNameExists(userName)) {
			return null;
		}

		User user = new User();
		user.setPassword(encoder.encode(signUpRequest.getPassword()));
		user.setUserName(signUpRequest.getUserName());

		return userRepository.save(user);
	}

	public boolean isUserNameExists(String userName) {
		if (userRepository.findByUserName(userName) != null) {
			return true;
		}
		return false;
	}

	public User authenticateUser(LoginRequest loginRequest) {
		String userName = loginRequest.getUserName();

		User user = userRepository.findByUserName(userName);
		if (user == null || !encoder.matches(loginRequest.getPassword(), user.getPassword())) {
			return null;
		}

		return user;

	}
}
