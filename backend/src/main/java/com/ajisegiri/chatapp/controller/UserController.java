package com.ajisegiri.chatapp.controller;

import com.ajisegiri.chatapp.dto.RegisterUser;
import com.ajisegiri.chatapp.model.Chat;
import com.ajisegiri.chatapp.model.User;
import com.ajisegiri.chatapp.repo.ChatRepository;
import com.ajisegiri.chatapp.repo.UserRepository;
import com.ajisegiri.chatapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.validation.Valid;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository userRepository;
    private final SimpUserRegistry simpUserRegistry;
    private final UserService userService;
    private final ChatRepository chatRepository;



    @PostMapping("user")
    public ResponseEntity createUser(@Valid @RequestBody RegisterUser user) {
        var result = userService.createUser(user);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }


    @GetMapping("user")
    public ResponseEntity<User> getUserByUsername(@RequestParam("username") String username) {
        var result = userRepository.findByUsername(username);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @GetMapping("active-users")
    public List<User> getSessions() {
        var users = simpUserRegistry.getUsers().stream()
                .map(p -> p.getName())
                .map(userRepository::findByUsername).collect(Collectors.toList());
        return users;
    }
    @GetMapping("chats/{channel}")
    public List<Chat> getMessages(@PathVariable("channel") String channel) {
        var userChats = chatRepository.findByChannel(channel, Sort.by(Sort.Direction.ASC,"timestamp"));
        return userChats;
    }

}