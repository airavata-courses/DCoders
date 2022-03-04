package com.user.filter;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.user.controller.UserController;
import com.user.dto.User;
import com.user.helper.MyUserDetails;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	Logger logger = org.slf4j.LoggerFactory.getLogger(CustomAuthenticationFilter.class);

	private final String APPLICATION_JSON = "application/json";
	private AuthenticationManager authenticationManager;
	private final ObjectMapper objectMapper = new ObjectMapper();

	public CustomAuthenticationFilter(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {

		StringBuilder stringBuilder = new StringBuilder();
		BufferedReader bufferedReader = null;
		try {
			InputStream inputStream = request.getInputStream();
			if (inputStream != null) {
				bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
				char[] charBuffer = new char[128];
				int bytesRead = -1;
				while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
					stringBuilder.append(charBuffer, 0, bytesRead);
				}
			} else {
				stringBuilder.append("");
			}
		} catch (IOException ex) {
		} finally {
			if (bufferedReader != null) {
				try {
					bufferedReader.close();
				} catch (IOException ex) {
				}
			}
		}

		User user = null;
		String body = stringBuilder.toString();
		Gson gson = new Gson();
		user = gson.fromJson(body, User.class);

		String userName = user.getUserName();
		String password = user.getPassword();
		logger.info("Authenticating user: "+userName);
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userName, password);
		return authenticationManager.authenticate(token);

	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {

		MyUserDetails user = (MyUserDetails) authResult.getPrincipal();
		
		logger.info("Authentication successful for user: "+user.getUsername());	
		logger.info("Generating token for user: "+user.getUsername());	
		
		Algorithm algo = Algorithm.HMAC256("secret".getBytes());
		String accessToken = JWT.create().withSubject(user.getUsername())
				.withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000)).sign(algo);
		response.setContentType(APPLICATION_JSON);
		
		logger.info("User: "+user.getUsername()+"& Token: "+accessToken);	
		objectMapper.writeValue(response.getOutputStream(), accessToken);
	}

}
