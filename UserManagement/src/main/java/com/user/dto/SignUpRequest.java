package com.user.dto;

import lombok.Data;

@Data
public class SignUpRequest {

	private String userName;
//	private String email;
	private String password;

	// Can use the following parameters for forgot password
//	private String securityQuestion;
//	private String securityAnswer;

}
