package com.ajisegiri.chatapp.events;

import com.ajisegiri.chatapp.dto.ChatRequest;
import com.ajisegiri.chatapp.dto.ChatRequestStatus;
import com.ajisegiri.chatapp.model.User;
import com.ajisegiri.chatapp.repo.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;

@Component
public final class EventBusService {
    private static Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();
    public static final  String ACTIVE_USERS_EVENT="active-users";
    public static final  String CHAT_REQUEST="chat-request";


    public synchronized static Map<String, SseEmitter> getEmitters() {
        return emitters;
    }

    public static void emitUserStatus(User user, String operation) {
//        String eventData=new JSONObject()
//                .put("user",user)
//                .put("operation",operation).toString();
        getEmitters().entrySet().parallelStream().forEach(emitterEntry->{
            try {
                emitterEntry.getValue().send(SseEmitter.event().name(ACTIVE_USERS_EVENT).data(new EventData(user,operation)));
            } catch (IOException e) {
                getEmitters().remove(emitterEntry.getKey());
            }
        });


    }

    public static void emitChatRequest(ChatRequest chatRequest) {
            try {
                SseEmitter sseEmitter = getEmitters().get(chatRequest.recipient());
                if (Objects.nonNull(sseEmitter))
                    sseEmitter.send(SseEmitter.event().name(CHAT_REQUEST).data(chatRequest));
            } catch (IOException e) {

            }
    }

    @Data
    @AllArgsConstructor
    private static class EventData {
        private User user;
        private String operation;
    }

}
