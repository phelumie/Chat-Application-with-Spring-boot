package com.ajisegiri.chatapp.config;

import com.ajisegiri.chatapp.handler.MyHandshakeInterceptor;
import com.ajisegiri.chatapp.handler.UserHandshakeHandler;
import com.ajisegiri.chatapp.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.messaging.converter.ByteArrayMessageConverter;
import org.springframework.messaging.converter.MessageConverter;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.scheduling.concurrent.ConcurrentTaskScheduler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.socket.config.annotation.*;
import java.util.Collections;
import java.util.List;
@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    private final MongoTemplate mongoTemplate;
    private final UserRepository userRepository;
    @Override
    public void configureMessageBroker(final MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic").setTaskScheduler(new ConcurrentTaskScheduler());
        registry.setApplicationDestinationPrefixes("/ws");
    }

    //    @Override
//    public void configureWebSocketTransport(WebSocketTransportRegistration registry) {
//        registry
//                .setSendTimeLimit(109850*1000000000)
//                .setSendBufferSizeLimit(79915*100024)
//                .setMessageSizeLimit(647410*100024);
//    }

    @Override
    public void configureWebSocketTransport(WebSocketTransportRegistration registry) {
        //increase if you are sending larger files
        registry.setMessageSizeLimit(500 * 1024); // set maximum message size
        registry.setSendBufferSizeLimit(500 * 1024); // set binary message buffer size

    }
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors( new MyHandshakeInterceptor(mongoTemplate,userRepository));
    }


    @Override
    public void registerStompEndpoints(final StompEndpointRegistry registry) {
        registry.addEndpoint("/chat")
                .setAllowedOrigins("http://localhost:4200")
                .setHandshakeHandler(new UserHandshakeHandler())
                .withSockJS();
    }



    @Override
    public boolean configureMessageConverters(List<MessageConverter> messageConverters) {
        messageConverters.add(new ByteArrayMessageConverter());
        return WebSocketMessageBrokerConfigurer.super.configureMessageConverters(messageConverters);
    }
//
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:4200");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        config.applyPermitDefaultValues();
        config.addAllowedOriginPattern("*");

        config.setAllowedMethods(Collections.singletonList("*"));
        config.setAllowCredentials(true );
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

}
