package com.ajisegiri.chatapp.customConstraints;

import com.ajisegiri.chatapp.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@Component
public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {

    @Autowired
    UserRepository userRepository;

    @Override
    public boolean isValid(String username, ConstraintValidatorContext context) {
        return !userRepository.existsByUsername(username);
    }
}
