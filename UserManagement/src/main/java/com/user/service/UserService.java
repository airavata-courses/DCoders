package com.user.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.user.dto.InvalidatedJWT;
import com.user.dto.LoginRequest;
import com.user.dto.SignUpRequest;
import com.user.dto.User;
import com.user.helper.MyUserDetails;
import com.user.repository.InvalidateJWTRepository;
import com.user.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private InvalidateJWTRepository repository;

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

	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// Implement authentication logic

		User user = userRepository.findByUserName(username);

		return new MyUserDetails(user);
	}

	public List<User> getUserDetails() {
		return userRepository.findAll();
	}

	public List<InvalidatedJWT> getInvalidatedJWTTokens() {
		return repository.findAll();
	}

	public InvalidatedJWT findJWTToken(String token) {
		return repository.findById(token).get();
	}

	public void saveInvalidatedToken(InvalidatedJWT token) {
		repository.save(token);
	}
}
