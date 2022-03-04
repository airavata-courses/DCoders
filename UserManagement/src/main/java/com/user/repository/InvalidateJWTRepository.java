package com.user.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.user.dto.InvalidatedJWT;

@Repository
public interface InvalidateJWTRepository extends MongoRepository<InvalidatedJWT, String> {

}
