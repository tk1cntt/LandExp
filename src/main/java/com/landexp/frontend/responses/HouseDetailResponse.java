package com.landexp.frontend.responses;

import java.util.ArrayList;
import java.util.List;

public class HouseDetailResponse {
    private HouseResponse house;
    private List<HouseImageResponse> images = new ArrayList<>();

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
