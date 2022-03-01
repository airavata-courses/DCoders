package com.storage.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.storage.dto.UserQuery;
import com.storage.service.QueryStorageService;

@RestController
@RequestMapping("/query")
public class QueryStorageController {

	@Autowired
	private QueryStorageService queryStorageService;

	@PostMapping("/save")
	public ResponseEntity<String> saveUsersQuery(@RequestBody UserQuery request) {

		UserQuery userQuery = queryStorageService.saveUserQueryDetails(request);

		if (userQuery != null) {
			return ResponseEntity.ok("Query saved successfully");
		}

		return ResponseEntity.badRequest().body("Failed to store the query. Please try again");
	}

	@GetMapping("/get/{userName}")
	public ResponseEntity<List<UserQuery>> getUsersQuery(@PathVariable("userName") String userName) {

		List<UserQuery> userQueries = queryStorageService.getUserQuery(userName);

		if (!CollectionUtils.isEmpty(userQueries)) {
			return ResponseEntity.ok().body(userQueries);
		}

		List<UserQuery> emptyList = Collections.emptyList();
		return ResponseEntity.badRequest().body(emptyList);
	}

}
