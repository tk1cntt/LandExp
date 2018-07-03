package com.landexp.service;

import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.NearbySearchRequest;
import com.google.maps.PlacesApi;
import com.google.maps.model.*;
import com.landexp.web.rest.errors.ExecuteRuntimeException;
import com.landexp.web.rest.responses.GooglePlaceResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.Map;

@Service
@Transactional
public class GoogleService {
    /**
     * Declare Logger variable to throws log messages on the console window
     **/
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private GeoApiContext context;

    public GoogleService(String googleApiKey) {
        context = new GeoApiContext.Builder()
            .apiKey(googleApiKey)
            .build();
    }

    public GooglePlaceResponse getPlaceDetail(String googleId) throws ExecuteRuntimeException {
        try {
            logger.debug("Place detail " + googleId);
            return mappingGooglePlaceRespoonse(PlacesApi.placeDetails(context, googleId).await());
        } catch (Exception e) {
            throw new ExecuteRuntimeException(e.getMessage());
        }
    }

    private GooglePlaceResponse mappingGooglePlaceRespoonse(PlaceDetails placeDetails) {
        GooglePlaceResponse googlePlaceResponse = new GooglePlaceResponse();
        googlePlaceResponse.setGoogleId(placeDetails.placeId);
        googlePlaceResponse.setType(placeDetails.types);
        googlePlaceResponse.setAddress(placeDetails.formattedAddress);
        googlePlaceResponse.setTitle(placeDetails.name);
        googlePlaceResponse.setUrl(placeDetails.url.toString());
        googlePlaceResponse.setLongitude(placeDetails.geometry.location.lng);
        googlePlaceResponse.setLatitude(placeDetails.geometry.location.lat);
        googlePlaceResponse.setRatingAverage(placeDetails.rating);
        return googlePlaceResponse;
    }

    public Map<String, GooglePlaceResponse> searchNearby(double latitude, double longitude, int radius, PlaceType[] types) throws ExecuteRuntimeException {
        try {
            logger.debug("Search near by [{},{}] with radius {} and type {}", latitude, longitude, radius, types.toString());
            NearbySearchRequest nearbySearchRequest = PlacesApi.nearbySearchQuery(context, new LatLng(latitude, longitude));
            nearbySearchRequest.radius(radius);
            nearbySearchRequest.type(types);
            nearbySearchRequest.language("vi");
            return getGooglePlaceResponses(nearbySearchRequest.await());
        } catch (Exception e) {
            throw new ExecuteRuntimeException(e.getMessage());
        }
    }

    private Map<String, GooglePlaceResponse> getGooglePlaceResponses(PlacesSearchResponse placesSearchResponse) {
        Map<String, GooglePlaceResponse> googlePlaceResponses = new HashMap<>();
        if (placesSearchResponse.results != null) {
            for (PlacesSearchResult result : placesSearchResponse.results) {
                GooglePlaceResponse googlePlaceResponse = new GooglePlaceResponse();
                googlePlaceResponse.setGoogleId(result.placeId);
                googlePlaceResponse.setType(result.types);
                googlePlaceResponse.setAddress(result.formattedAddress);
                googlePlaceResponse.setTitle(result.name);
                googlePlaceResponse.setLongitude(result.geometry.location.lng);
                googlePlaceResponse.setLatitude(result.geometry.location.lat);
                googlePlaceResponse.setRatingAverage(result.rating);
                googlePlaceResponses.put(result.placeId, googlePlaceResponse);
            }
        }
        return googlePlaceResponses;
    }

    public GooglePlaceResponse searchByAddress(String address) {
        try {
            GeocodingResult[] results = GeocodingApi.geocode(context, address).await();
            if (!ObjectUtils.isEmpty(results) && results.length >= 1) {
                GooglePlaceResponse googlePlaceResponse = new GooglePlaceResponse();
                googlePlaceResponse.setGoogleId(results[0].placeId);
                googlePlaceResponse.setAddress(results[0].formattedAddress);
                googlePlaceResponse.setLongitude(results[0].geometry.location.lng);
                googlePlaceResponse.setLatitude(results[0].geometry.location.lat);
                return googlePlaceResponse;
            }
            return null;
        } catch (Exception e) {
            throw new ExecuteRuntimeException(e.getMessage());
        }
    }
}
