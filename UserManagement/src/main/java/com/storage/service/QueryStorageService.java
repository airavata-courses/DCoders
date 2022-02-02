package com.storage.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.storage.dto.UserQuery;
import com.storage.repository.QueryStorageRepository;

@Service
public class QueryStorageService {

	@Autowired
	private QueryStorageRepository queryStorageRepository;

	public UserQuery saveUserQueryDetails(UserQuery userQuery) {
		return queryStorageRepository.save(userQuery);
	}

}
