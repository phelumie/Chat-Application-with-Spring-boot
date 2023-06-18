package com.ajisegiri.chatapp.dto;

public record ChatRequest(String sender,String recipient, ChatRequestStatus chatRequestStatus) {
}
