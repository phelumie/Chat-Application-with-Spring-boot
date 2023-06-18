package com.ajisegiri.chatapp.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Address {

    private String street;
    private String city;
    private String state;
    private String country;
    private String postalCode;



}
