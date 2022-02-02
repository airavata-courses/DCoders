package com.user.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.user.dto.User;

@Repository
public interface UserRepository extends MongoRepository<User, String>{

	
	
	public User findByUserName(String userName);
//	public User findUserByUserName(String userName) {
//
//		// API Call to DataStorageService to fetch the user from DB
//		return null;
//	}
//
//	public User registerUser(User user) {
//
//		// API Call to DataStorageService for storing User's info in DB
//		return null;
//	}

}
