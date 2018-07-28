package com.landexp.responses;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GooglePlaceInfoResponse {

    private String next_page_token;

    private GooglePlaceResultResponse[] results;

    public String getNext_page_token() {
        return next_page_token;
    }

    public void setNext_page_token(String next_page_token) {
        this.next_page_token = next_page_token;
    }

    public GooglePlaceResultResponse[] getResults() {
        return results;
    }

    public void setResults(GooglePlaceResultResponse[] results) {
        this.results = results;
    }
}
