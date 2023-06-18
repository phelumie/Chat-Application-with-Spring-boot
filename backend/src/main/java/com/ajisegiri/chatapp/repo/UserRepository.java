package com.ajisegiri.chatapp.repo;
import com.ajisegiri.chatapp.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User,String> {
    boolean existsByUsername(String username);
    User findByUsername(String username);
    void  deleteByUsername(String username);

}
