package com.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.user.dto.LoginRequest;
import com.user.dto.SignUpRequest;
import com.user.dto.User;
import com.user.service.UserService;

@RestController
//@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
		User user = userService.authenticateUser(loginRequest);
		if (user == null) {
			return ResponseEntity.badRequest().body("Invalid Credentials! Please try again");
		}
		return ResponseEntity.ok("Login successful");
	}

	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody SignUpRequest signUpRequest) {
		if (userService.registerUser(signUpRequest) == null) {
			return ResponseEntity.badRequest()
					.body("Your username is very famous! Somebody already took it. Please try another one");
		}
		return ResponseEntity.ok("Welcome to the family");
	}

//	@RequestMapping("/logout")
//	public ResponseEntity<Boolean> logout() {
//
//		return ResponseEntity.ok(true);
//	}

}
