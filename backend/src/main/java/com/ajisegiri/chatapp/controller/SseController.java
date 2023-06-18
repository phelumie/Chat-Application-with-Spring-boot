package com.ajisegiri.chatapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

import static com.ajisegiri.chatapp.events.EventBusService.*;


@RestController
public class SseController {

    @GetMapping("/active-users/subscribe")
    public SseEmitter activeUsersSubscribe(HttpServletRequest request){
        String clientId = request.getSession().getId();

        SseEmitter sseEmitter=new SseEmitter(Long.MAX_VALUE);
        try {
            sseEmitter.send(SseEmitter.event().name(ACTIVE_USERS_EVENT));
        } catch (IOException e) {
            e.printStackTrace();
        }
        sseEmitter.onCompletion(()->getEmitters().remove(clientId));
        sseEmitter.onTimeout(()-> getEmitters().remove(clientId));
        sseEmitter.onError((e)-> getEmitters().remove(clientId));

        getEmitters().put(clientId,sseEmitter);
        return  sseEmitter;
    }

    @GetMapping("/{userName}/chat-request/subscribe")
    public SseEmitter chatRequest(@PathVariable("userName") String userName){
        SseEmitter sseEmitter=new SseEmitter(Long.MAX_VALUE);
        try {
            sseEmitter.send(SseEmitter.event().name(CHAT_REQUEST));
        } catch (IOException e) {
            e.printStackTrace();
        }
        sseEmitter.onCompletion(()->getEmitters().remove(userName));
        sseEmitter.onTimeout(()-> getEmitters().remove(userName));
        sseEmitter.onError((e)-> getEmitters().remove(userName));
        getEmitters().put(userName,sseEmitter);
        return  sseEmitter;
    }




}
