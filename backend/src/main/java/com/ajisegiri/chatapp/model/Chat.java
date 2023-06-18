package com.ajisegiri.chatapp.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.File;
import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Message")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Chat {
    @Id
    private String id;
    @Indexed
    private String from;
    @Indexed
    private String to;
//    @TextIndexed
    private String content;
    private String channel;
    private List<Object> files;
    @Indexed
    private Date timestamp;


    @Transient
    public static final  String MESSAGE_SEQUENCE ="message_sequence";
}
