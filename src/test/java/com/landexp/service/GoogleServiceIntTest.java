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
    public void testGoogleServiceSearchNearBy() throws JsonProcessingException {
        PlaceType[] places = new PlaceType[2];
        places[0] = PlaceType.CAFE;
        places[1] = PlaceType.FOOD;
        places[1] = PlaceType.SCHOOL;
        Map<String, GooglePlaceResponse> responses = googleService.searchNearby(21.0286669, 105.8521484, 500, places);
        System.out.println(mapper.writeValueAsString(responses));
    }

    @Test
    public void testGoogleServiceSearchByAddress() throws JsonProcessingException {
        GooglePlaceResponse response = googleService.searchByAddress("Trung Hòa, Cầu Giấy, Hà Nội");
        System.out.println(mapper.writeValueAsString(response));
    }
}
