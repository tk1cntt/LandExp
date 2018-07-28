package com.landexp.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.PlacesApi;
import com.google.maps.model.*;
import com.graphhopper.PathWrapper;
import com.landexp.frontend.responses.MappingUtils;
import com.landexp.responses.GooglePlaceInfoResponse;
import com.landexp.responses.GooglePlaceResultResponse;
import com.landexp.web.rest.errors.ExecuteRuntimeException;
import com.landexp.web.rest.responses.GooglePlaceResponse;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

@Service
@Transactional
public class GoogleService {
    @Autowired
    GraphHopperService graphHopperService;
    /**
     * Declare Logger variable to throws log messages on the console window
     **/
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private GeoApiContext context;
    private String googleApiKey;

    @Autowired
    private RestTemplate restTemplate;

    public GoogleService(String googleApiKey) {
        this.googleApiKey = googleApiKey;
        context = new GeoApiContext.Builder()
            .apiKey(googleApiKey)
            .build();
    }

    public static String generateUserAgent() {
        List<String> userAgents = new ArrayList<String>();
        // Firefox
        userAgents.add("Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1");
        userAgents.add("Mozilla/5.0 (Windows NT 6.3; rv:36.0) Gecko/20100101 Firefox/36.0");
        userAgents.add("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10; rv:33.0) Gecko/20100101 Firefox/33.0");
        userAgents.add("Mozilla/5.0 (X11; Linux i586; rv:31.0) Gecko/20100101 Firefox/31.0");
        userAgents.add("Mozilla/5.0 (Windows NT 6.1; WOW64; rv:31.0) Gecko/20130401 Firefox/31.0");
        userAgents.add("Mozilla/5.0 (Windows NT 5.1; rv:31.0) Gecko/20100101 Firefox/31.0");
        // Chrome
        userAgents.add("Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36");
        userAgents.add("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36");
        userAgents.add("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36");
        userAgents.add("Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36");
        userAgents.add("Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.93 Safari/537.36");
        // nextInt is normally exclusive of the top value,
        // so add 1 to make it inclusive
        int randomNum = ThreadLocalRandom.current().nextInt(0, 10);
        if (randomNum >= userAgents.size()) {
            randomNum--;
        }
        // Get user agent
        return userAgents.get(randomNum);
    }

    private HttpEntity<String> addHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.put("Upgrade-Insecure-Requests", Collections.singletonList(new String("1")));
        headers.put("User-Agent", Collections.singletonList(generateUserAgent()));
        return new HttpEntity<String>(headers);
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
        googlePlaceResponse.setAddress(placeDetails.formattedAddress);
        googlePlaceResponse.setTitle(placeDetails.name);
        googlePlaceResponse.setUrl(placeDetails.url.toString());
        googlePlaceResponse.setLongitude(placeDetails.geometry.location.lng);
        googlePlaceResponse.setLatitude(placeDetails.geometry.location.lat);
        googlePlaceResponse.setRatingAverage(placeDetails.rating);
        return googlePlaceResponse;
    }

    /*
    public Map<String, GooglePlaceResponse> searchNearby(double latitude, double longitude, int radius, String placeType) throws ExecuteRuntimeException {
        try {
            ObjectMapper mapper = new ObjectMapper();
            logger.debug("Search near by [{},{}] with radius {} and type {}", latitude, longitude, radius, placeType);
            StringBuilder link = new StringBuilder();
            link.append("https://maps.googleapis.com/maps/api/place/nearbysearch/json?");
            link.append("location=").append(latitude).append(",").append(longitude);
            link.append("&radius=").append(radius);
            link.append("&type=").append(placeType);
            link.append("&rankby=prominence");
            link.append("&language=vi");
            link.append("&key=").append(googleApiKey);
            String json = restTemplate.getForObject(link.toString(), String.class, addHeaders());
            GooglePlaceInfoResponse response = mapper.readValue(json, GooglePlaceInfoResponse.class);
            Map<String, GooglePlaceResponse> googlePlaceResponses = new HashMap<>();
            for (GooglePlaceResultResponse result : response.getResults()) {
                GooglePlaceResponse googlePlaceResponse = new GooglePlaceResponse();
                googlePlaceResponse.setGoogleId(result.getPlaceId());
                googlePlaceResponse.setAddress(result.getVicinity());
                googlePlaceResponse.setTitle(result.getName());
                googlePlaceResponse.setLongitude(result.getGeometry().getLocation().getLng());
                googlePlaceResponse.setLatitude(result.getGeometry().getLocation().getLat());
                googlePlaceResponse.setRatingAverage(result.getRating());
                PathWrapper path = graphHopperService.route(latitude, longitude, result.getGeometry().getLocation().getLat(), result.getGeometry().getLocation().getLng(), "car");
                if (!ObjectUtils.isEmpty(path)) {
                    googlePlaceResponse.setDistance(path.getDistance());
                }
                googlePlaceResponses.put(result.getPlaceId(), googlePlaceResponse);
            }
            return googlePlaceResponses;
        } catch (Exception e) {
            e.printStackTrace();
            throw new ExecuteRuntimeException(e.getMessage());
        }
    }
    */

    public List<GooglePlaceResponse> searchNearby(double latitude, double longitude, int radius, String placeType) throws ExecuteRuntimeException {
        try {
            ObjectMapper mapper = new ObjectMapper();
            logger.debug("Search near by [{},{}] with radius {} and type {}", latitude, longitude, radius, placeType);
            StringBuilder link = new StringBuilder();
            link.append("https://maps.googleapis.com/maps/api/place/nearbysearch/json?");
            link.append("location=").append(latitude).append(",").append(longitude);
            link.append("&radius=").append(radius);
            link.append("&type=").append(placeType);
            link.append("&rankby=prominence");
            link.append("&language=vi");
            link.append("&key=").append(googleApiKey);
            String json = restTemplate.getForObject(link.toString(), String.class, addHeaders());
            GooglePlaceInfoResponse response = mapper.readValue(json, GooglePlaceInfoResponse.class);
            List<GooglePlaceResponse> googlePlaceResponses = new ArrayList<>();
            for (GooglePlaceResultResponse result : response.getResults()) {
                GooglePlaceResponse googlePlaceResponse = new GooglePlaceResponse();
                googlePlaceResponse.setGoogleId(result.getPlaceId());
                googlePlaceResponse.setAddress(result.getVicinity());
                googlePlaceResponse.setTitle(result.getName());
                googlePlaceResponse.setLongitude(result.getGeometry().getLocation().getLng());
                googlePlaceResponse.setLatitude(result.getGeometry().getLocation().getLat());
                googlePlaceResponse.setRatingAverage(result.getRating());
                PathWrapper path = graphHopperService.route(latitude, longitude, result.getGeometry().getLocation().getLat(), result.getGeometry().getLocation().getLng(), "car");
                if (!ObjectUtils.isEmpty(path)) {
                    googlePlaceResponse.setDistance(path.getDistance());
                }
                googlePlaceResponses.add(googlePlaceResponse);
            }
            return googlePlaceResponses;
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

    public Collection<GooglePlaceResponse> getPlaces(String placeId, String placeType, double latitude, double longitude, int radius) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Path path = Paths.get("google-places", placeId, placeType.toString().toLowerCase() + ".json");
        MappingUtils.folderBy(path.toFile());
        if (path.toFile().exists()) {
            return mapper.readValue(path.toFile(), Collection.class);
        } else {
            String jsonArray = mapper.writeValueAsString(searchNearby(latitude, longitude, radius, placeType));
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
