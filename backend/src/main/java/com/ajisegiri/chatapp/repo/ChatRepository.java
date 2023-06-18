package com.ajisegiri.chatapp.repo;

import com.ajisegiri.chatapp.model.Chat;
import com.ajisegiri.chatapp.model.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChatRepository extends MongoRepository<Chat,String> {
    List<Chat> findByChannel(String channel, Sort sort);

}
