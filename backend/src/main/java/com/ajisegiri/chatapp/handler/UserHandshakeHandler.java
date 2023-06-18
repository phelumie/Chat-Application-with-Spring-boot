package com.ajisegiri.chatapp.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.security.auth.UserPrincipal;
import lombok.NoArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.messaging.simp.user.UserRegistryMessageHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import java.security.Principal;
import java.util.Map;

@Slf4j
@Component
public class UserHandshakeHandler extends DefaultHandshakeHandler {

    @SneakyThrows
    @Override
    protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler, Map<String, Object> attributes) {

        UriComponents uriComponents = UriComponentsBuilder.fromUri(request.getURI()).build();
        MultiValueMap<String, String> queryParams = uriComponents.getQueryParams();
        String token = queryParams.getFirst("token");
        attributes.put("user-id", token);
        log.info("User with ID '{}' opened the page", token);
        return new UserPrincipal(token);
    }


}
