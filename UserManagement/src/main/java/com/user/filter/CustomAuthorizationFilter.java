package com.user.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import javax.annotation.PostConstruct;
import javax.servlet.FilterChain;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.util.StringUtils;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.user.dto.InvalidatedJWT;
import com.user.service.UserService;

public class CustomAuthorizationFilter extends OncePerRequestFilter {

	private final String AUTHORIZATION = "Authorization";
	private final String BEARER = "Bearer ";

	@Autowired
	UserService service;
	@Autowired
	private ApplicationContext context;

	@PostConstruct
	public void init() {
		service = context.getBean(UserService.class);
		SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);
	}

	Set<String> accessiblePaths = new HashSet<String>(Arrays.asList("/user/login", "/user/register"));

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		String path = request.getServletPath();

		if (accessiblePaths.contains(path)) {
			filterChain.doFilter(request, response);
		} else if (path.equals("/user/logout-success")) {
			String authorizationHeader = request.getHeader(AUTHORIZATION);
			if (!StringUtils.isEmpty(authorizationHeader) && authorizationHeader.startsWith(BEARER)) {
				String token = authorizationHeader.substring(BEARER.length());

				ServletContext servletContext = request.getServletContext();
				WebApplicationContext webApplicationContext = WebApplicationContextUtils
						.getWebApplicationContext(servletContext);
				service = webApplicationContext.getBean(UserService.class);

				service.saveInvalidatedToken(new InvalidatedJWT(token));
			}
			filterChain.doFilter(request, response);

		}

		else {
			String authorizationHeader = request.getHeader(AUTHORIZATION);
			if (!StringUtils.isEmpty(authorizationHeader) && authorizationHeader.startsWith(BEARER)) {
				String token = authorizationHeader.substring(BEARER.length());
				Algorithm algo = Algorithm.HMAC256("secret".getBytes());
				JWTVerifier verifier = JWT.require(algo).build();
				DecodedJWT decoder = verifier.verify(token);
				String userName = decoder.getSubject();

				ServletContext servletContext = request.getServletContext();
				WebApplicationContext webApplicationContext = WebApplicationContextUtils
						.getWebApplicationContext(servletContext);
				service = webApplicationContext.getBean(UserService.class);

				for (InvalidatedJWT jwt : service.getInvalidatedJWTTokens()) {
					if (jwt.getToken().equals(token)) {
						throw new UsernameNotFoundException("User not found");
					}
				}
				Collection<SimpleGrantedAuthority> auhtorities = new ArrayList<SimpleGrantedAuthority>();
				UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
						userName, null, auhtorities);
				SecurityContextHolder.getContext().setAuthentication(authenticationToken);
				filterChain.doFilter(request, response);
			} else {
				filterChain.doFilter(request, response);
			}
		}

	}

}
