package com.ajisegiri.chatapp.service;

import com.ajisegiri.chatapp.dto.RegisterUser;
import com.ajisegiri.chatapp.model.User;

public interface UserService {
    User createUser(RegisterUser user);
}
