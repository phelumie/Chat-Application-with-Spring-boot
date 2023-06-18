package com.ajisegiri.chatapp.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Users")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class User {
    @Id
    private Long id;
    @Indexed(unique = true)
    private String username;
    private String firstName;
    private String lastName;
    private Gender gender;
    private String favQuotes;
    private UserDetails userDetails;
    private Address address;
    @CreatedBy
    private Date creationDate;
    private String lastSeen;

    @Transient
    public static final  String USER_SEQUENCE ="user_sequence";
}
