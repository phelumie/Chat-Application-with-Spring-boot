package com.ajisegiri.chatapp.controller;

import com.ajisegiri.chatapp.dto.ChatRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.ajisegiri.chatapp.events.EventBusService.emitChatRequest;

@RestController
@CrossOrigin(origins = "*",methods = RequestMethod.POST)
@RequestMapping("api")
public class ChatRequestController {

    @PostMapping("/chat/request")
    public ResponseEntity chatRequest(@RequestBody ChatRequest chatRequest){
        emitChatRequest(chatRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
