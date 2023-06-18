package com.ajisegiri.chatapp.handler;
import com.ajisegiri.chatapp.model.User;
import com.ajisegiri.chatapp.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Component;


import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;
import java.util.concurrent.CompletableFuture;

import static com.ajisegiri.chatapp.events.EventBusService.*;


@Component
@RequiredArgsConstructor
public class MyHandshakeInterceptor implements ChannelInterceptor{
    private final MongoTemplate mongoTemplate;
    private final UserRepository userRepository;


    @Override
    public void afterSendCompletion(Message<?> message, MessageChannel channel, boolean sent, Exception ex) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);

        if (StompCommand.CONNECT.equals(headerAccessor.getCommand())){

        }
        if (StompCommand.DISCONNECT.equals(headerAccessor.getCommand())) {

        }
    }


    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);

        if (StompCommand.CONNECT.equals(headerAccessor.getCommand())){
            String username=headerAccessor.getUser().getName();
            var user=userRepository.findByUsername(username);
            emitUserStatus(user,"add");

        }
        if (StompCommand.DISCONNECT.equals(headerAccessor.getCommand())){
            String username=headerAccessor.getUser().getName();
            var user=userRepository.findByUsername(username);
            emitUserStatus(user,"remove");
            //update last seen
            CompletableFuture.runAsync(() ->{
                updateUserLastSeen(username);
            });

        }
        var modifiedMessage= MessageBuilder.createMessage(message.getPayload(), headerAccessor.getMessageHeaders());

        // use header
         return ChannelInterceptor.super.preSend(modifiedMessage, channel);

    }

    @SneakyThrows
    private void updateUserLastSeen(String username){

        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
        df.setTimeZone(TimeZone.getTimeZone("GMT+1")); // Set the time zone to UTC
        String formattedDate = df.format(new Date());
        Query query = new Query(Criteria.where("username").is(username));
        Update update = new Update().set("lastSeen", formattedDate);
        mongoTemplate.updateFirst(query, update, User.class);
    }
}

