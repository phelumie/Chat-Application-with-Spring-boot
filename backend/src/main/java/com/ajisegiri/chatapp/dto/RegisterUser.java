package com.ajisegiri.chatapp.dto;

import com.ajisegiri.chatapp.customConstraints.UniqueUsername;
import com.ajisegiri.chatapp.model.Address;
import com.ajisegiri.chatapp.model.UserDetails;
import lombok.Builder;


@Builder
public record RegisterUser (@UniqueUsername String username,UserDetails userDetails,Address address){}

