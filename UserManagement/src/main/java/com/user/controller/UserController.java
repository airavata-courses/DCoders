package com.user.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.user.dto.InvalidatedJWT;
import com.user.dto.LoginRequest;
import com.user.dto.SignUpRequest;
import com.user.dto.User;
import com.user.repository.InvalidateJWTRepository;
import com.user.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "**")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
//		User user = userService.authenticateUser(loginRequest);
//		if (user == null) {
//			return ResponseEntity.badRequest().body("Invalid Credentials! Please try again");
//		}
		return ResponseEntity.ok("Login successful");
	}

	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody SignUpRequest signUpRequest) {
		if (userService.registerUser(signUpRequest) == null) {
			return ResponseEntity.badRequest()
					.body("Your username is very prominent! Somebody already took it. Please try another one");
		}
		return ResponseEntity.ok("Welcome to the family");
	}

	@GetMapping("/logout")
	public ResponseEntity<String> logout() {
		return ResponseEntity.ok().body("Logout Successful");
	}

	@GetMapping("/logout-success")
	public ResponseEntity<String> logoutSuccess() {
		return ResponseEntity.ok().body("Logout Successful");
	}

	@GetMapping("/authentication")
	public ResponseEntity<Boolean> authentication() {
		return ResponseEntity.ok(true);
	}

	@GetMapping("/dummy/{year_new}/{month_new}/{day_new}/{radar_new}")
	public static ResponseEntity<String> dummyTest(@PathVariable("year_new") String yearNew,
			@PathVariable("month_new") String month_new, @PathVariable("day_new") String day_new,
			@PathVariable("radar_new") String radar_new) {
		return ResponseEntity.ok("Ahhhh");

	}

	@GetMapping("/all")
	public ResponseEntity<List<User>> getUserDetails() {
		List<User> users = userService.getUserDetails();
		return ResponseEntity.ok(users);
	}
}
