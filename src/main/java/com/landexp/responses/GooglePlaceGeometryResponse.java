package com.landexp.responses;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GooglePlaceGeometryResponse {
    private GooglePlaceLocationResponse location;

    public GooglePlaceLocationResponse getLocation() {
        return location;
    }

    public void setLocation(GooglePlaceLocationResponse location) {
        this.location = location;
    }
}
