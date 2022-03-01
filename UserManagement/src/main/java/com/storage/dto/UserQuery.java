package com.storage.dto;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document
public class UserQuery {
	private String userName;
	private QueryDetails queryDetails;
}
