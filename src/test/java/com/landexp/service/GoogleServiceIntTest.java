package com.landexp.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.maps.model.PlaceType;
import com.landexp.LandexpApp;
import com.landexp.web.rest.responses.GooglePlaceResponse;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.util.Map;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = LandexpApp.class)
public class GoogleServiceIntTest {
    ObjectMapper mapper = new ObjectMapper();

    @Autowired
    private GoogleService googleService;

    @Test
    public void testGoogleService() throws JsonProcessingException {
        GooglePlaceResponse response = googleService.getPlaceDetail("ChIJlclXM5WrNTERDqL5tGu_ugE");
        System.out.println(mapper.writeValueAsString(response));
    }

    @Test
    public void testGoogleServiceSearchNearBy() throws IOException {
        System.out.println(mapper.writeValueAsString(googleService.getPlaces("ChIJlclXM5WrNTERDqL5tGu_ugE", "school", 10.76441,106.67443, 1000)));
        System.out.println(mapper.writeValueAsString(googleService.getPlaces("ChIJlclXM5WrNTERDqL5tGu_ugE", "supermarket", 10.76441,106.67443, 1000)));
        System.out.println(mapper.writeValueAsString(googleService.getPlaces("ChIJlclXM5WrNTERDqL5tGu_ugE", "hospital", 10.76441,106.67443, 1000)));
        System.out.println(mapper.writeValueAsString(googleService.getPlaces("ChIJlclXM5WrNTERDqL5tGu_ugF", "school", 21.0316575,105.8555353, 1000)));
        System.out.println(mapper.writeValueAsString(googleService.getPlaces("ChIJlclXM5WrNTERDqL5tGu_ugF", "supermarket", 21.0316575,105.8555353, 1000)));
        System.out.println(mapper.writeValueAsString(googleService.getPlaces("ChIJlclXM5WrNTERDqL5tGu_ugF", "hospital", 21.0316575,105.8555353, 1000)));
    }

    @Test
    public void testGoogleServiceSearchByAddress() throws JsonProcessingException {
        GooglePlaceResponse response = googleService.searchByAddress("Trung Hòa, Cầu Giấy, Hà Nội");
        System.out.println(mapper.writeValueAsString(response));
    }
}
