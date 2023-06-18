package com.ajisegiri.chatapp.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDetails implements Serializable{

    private LocalDate dob;
    private String occupation;
    private String maritalStatus;
    private String disability;


}
