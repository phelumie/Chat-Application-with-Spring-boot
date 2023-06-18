package com.ajisegiri.chatapp.dto;



import java.util.Date;
import java.util.List;


public record Message(String from, String to, String content, Date timestamp,  List<Object> files) {}
