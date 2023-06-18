package com.ajisegiri.chatapp.model;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Gender {
    MALE("Male"),
    FEMALE("Female"),
    NON_BINARY("Non-binary"),
    GENDERQUEER("Genderqueer"),
    TRANSGENDER("Transgender"),
    GENDER_FLUID("Gender fluid"),
    TWO_SPIRIT("Two-spirit"),
    BIGENDER("Bigender"),
    AGENDER("Agender"),
    ANDROGYNE("Androgyne"),
    DEMIGENDER("Demigender"),
    NEUTROIS("Neutrois"),
    PANGENDER("Pangender"),
    THIRD_GENDER("Third gender"),
    OTHER("Other");

    @Override
    @JsonValue
    public String toString() {
        return displayName;
    }

    private final String displayName;

    Gender(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
