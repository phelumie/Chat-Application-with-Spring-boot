package com.ajisegiri.chatapp.service.Impl;

import com.ajisegiri.chatapp.dto.RegisterUser;
import com.ajisegiri.chatapp.model.Address;
import com.ajisegiri.chatapp.model.UserDetails;
import com.ajisegiri.chatapp.repo.UserRepository;
import com.ajisegiri.chatapp.service.SequenceGeneratorService;
import com.ajisegiri.chatapp.service.UserService;
import lombok.RequiredArgsConstructor;
import com.ajisegiri.chatapp.model.User;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.Date;

import static com.ajisegiri.chatapp.model.User.USER_SEQUENCE;

@Service
@RequiredArgsConstructor

public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final SequenceGeneratorService sequenceGeneratorService;

    @Override
    public User createUser(RegisterUser registerUser) {
        User userModel = new User();
        BeanUtils.copyProperties(registerUser,userModel);
        userModel.setId(sequenceGeneratorService.getSequenceNumber(USER_SEQUENCE));
        userModel.setCreationDate(new Date());
        var result=userRepository.save(userModel);
        return result;
    }
}
