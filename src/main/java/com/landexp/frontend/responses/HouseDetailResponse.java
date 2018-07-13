package com.landexp.frontend.responses;

import java.util.ArrayList;
import java.util.List;

public class HouseDetailResponse {
    private String title;
    private String description;
    private HouseResponse house;
    private List<HouseImageResponse> images = new ArrayList<>();

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public HouseResponse getHouse() {
        return house;
    }

    public void setHouse(HouseResponse house) {
        this.house = house;
    }

    public List<HouseImageResponse> getImages() {
        return images;
    }

    public void setImages(List<HouseImageResponse> images) {
        this.images = images;
    }
}
