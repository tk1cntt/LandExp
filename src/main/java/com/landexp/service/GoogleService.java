package com.landexp.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.NearbySearchRequest;
import com.google.maps.PlacesApi;
import com.google.maps.model.*;
import com.graphhopper.PathWrapper;
import com.landexp.frontend.responses.MappingUtils;
import com.landexp.web.rest.errors.ExecuteRuntimeException;
import com.landexp.web.rest.responses.GooglePlaceResponse;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;
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

    @Autowired
    GraphHopperService graphHopperService;

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
            nearbySearchRequest.rankby(RankBy.PROMINENCE);
            return getGooglePlaceResponses(latitude, longitude, nearbySearchRequest.await());
        } catch (Exception e) {
            e.printStackTrace();
            throw new ExecuteRuntimeException(e.getMessage());
        }
    }

    private Map<String, GooglePlaceResponse> getGooglePlaceResponses(double latitude, double longitude, PlacesSearchResponse placesSearchResponse) {
        Map<String, GooglePlaceResponse> googlePlaceResponses = new HashMap<>();
        if (placesSearchResponse.results != null) {
            for (PlacesSearchResult result : placesSearchResponse.results) {
                GooglePlaceResponse googlePlaceResponse = new GooglePlaceResponse();
                googlePlaceResponse.setGoogleId(result.placeId);
                googlePlaceResponse.setType(result.types);
                googlePlaceResponse.setAddress(result.vicinity);
                googlePlaceResponse.setTitle(result.name);
                googlePlaceResponse.setLongitude(result.geometry.location.lng);
                googlePlaceResponse.setLatitude(result.geometry.location.lat);
                googlePlaceResponse.setRatingAverage(result.rating);
                PathWrapper path = graphHopperService.route(latitude, longitude, result.geometry.location.lat, result.geometry.location.lng, "car");
                if (!ObjectUtils.isEmpty(path)) {
                    googlePlaceResponse.setDistance(path.getDistance());
                }
                googlePlaceResponses.put(result.placeId, googlePlaceResponse);
            }
        }
        return googlePlaceResponses;
    }

    public Collection<GooglePlaceResponse> getPlaces(String placeId, PlaceType placeType, double latitude, double longitude, int radius) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Path path = Paths.get("google-places", placeId, placeType.toString().toLowerCase() + ".json");
        MappingUtils.folderBy(path.toFile());
        if (path.toFile().exists()) {
            return mapper.readValue(path.toFile(), Collection.class);
        } else {
            PlaceType[] places = new PlaceType[1];
            places[0] = placeType;
            Map<String, GooglePlaceResponse> restaurants = searchNearby(latitude, longitude, radius, places);
            String jsonArray = mapper.writeValueAsString(restaurants.values());
            FileUtils.write(path.toFile(), jsonArray, "utf-8");
            return mapper.readValue(path.toFile(), Collection.class);
        }
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
