package com.storage.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.storage.dto.UserQuery;

@Repository
public interface QueryStorageRepository extends MongoRepository<UserQuery, String> {

	public List<UserQuery> findByUserName(String userName);

}
