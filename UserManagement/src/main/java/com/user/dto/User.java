package com.user.dto;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data
public class User {

	private String userName;
	private String password;

//	public Collection<? extends GrantedAuthority> getAuthorities() {
//		// TODO Auto-generated method stub
//		return null;
//	}
//
//	public String getUsername() {
//		// TODO Auto-generated method stub
//		return this.getUsername();
//	}
//
//	public String getPassword() {
//		return this.getPassword();
//	}
//
//
//	public boolean isAccountNonExpired() {
//		// TODO Auto-generated method stub
//		return false;
//	}
//
//	public boolean isAccountNonLocked() {
//		// TODO Auto-generated method stub
//		return true;
//	}
//
//	public boolean isCredentialsNonExpired() {
//		// TODO Auto-generated method stub
//		return true;
//	}
//
//	public boolean isEnabled() {
//		// TODO Auto-generated method stub
//		return true;
//	}

}
