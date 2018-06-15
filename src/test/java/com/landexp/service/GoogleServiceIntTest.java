package com.landexp.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.landexp.LandexpApp;
import com.landexp.web.rest.responses.GooglePlaceResponse;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = LandexpApp.class)
public class GoogleServiceIntTest {
    ObjectMapper mapper = new ObjectMapper();

    @Autowired
    private GoogleService googleService;

    @Test
    public void testGoogleService() throws JsonProcessingException {
        GooglePlaceResponse response = googleService.getPlaceDetail("ChIJC3Cf2PuLGGAROO00ukl8JwA");
        System.out.println(mapper.writeValueAsString(response));
    }
}
