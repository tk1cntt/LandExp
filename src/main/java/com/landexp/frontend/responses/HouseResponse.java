package com.landexp.frontend.responses;

import com.landexp.domain.enumeration.*;

import javax.persistence.Lob;
import java.time.LocalDate;

public class HouseResponse {
    private Long id;
    private String actionType;
    private String landType;
    private String projectName;
    private String money;
    private String address;
    private String image;
    private String imageContentType;
    private Float acreage;
    private Float acreageStreetSide;
    private Float discount;
    private String direction;
    private String directionBalcony;
    private String floor;
    private Float numberOfFloor;
    private Integer bathRoom;
    private Integer bedRoom;
    private String parking;
    private String summary;
    private Float latitude;
    private Float longitude;
    private String updateAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getActionType() {
        return actionType;
    }

    public void setActionType(String actionType) {
        this.actionType = actionType;
    }

    public String getLandType() {
        return landType;
    }

    public void setLandType(String landType) {
        this.landType = landType;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getMoney() {
        return money;
    }

    public void setMoney(String money) {
        this.money = money;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public Float getAcreage() {
        return acreage;
    }

    public void setAcreage(Float acreage) {
        this.acreage = acreage;
    }

    public Float getAcreageStreetSide() {
        return acreageStreetSide;
    }

    public void setAcreageStreetSide(Float acreageStreetSide) {
        this.acreageStreetSide = acreageStreetSide;
    }

    public Float getDiscount() {
        return discount;
    }

    public void setDiscount(Float discount) {
        this.discount = discount;
    }

    public String getDirection() {
        return direction;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }

    public String getDirectionBalcony() {
        return directionBalcony;
    }

    public void setDirectionBalcony(String directionBalcony) {
        this.directionBalcony = directionBalcony;
    }

    public String getFloor() {
        return floor;
    }

    public void setFloor(String floor) {
        this.floor = floor;
    }

    public Float getNumberOfFloor() {
        return numberOfFloor;
    }

    public void setNumberOfFloor(Float numberOfFloor) {
        this.numberOfFloor = numberOfFloor;
    }

    public Integer getBathRoom() {
        return bathRoom;
    }

    public void setBathRoom(Integer bathRoom) {
        this.bathRoom = bathRoom;
    }

    public Integer getBedRoom() {
        return bedRoom;
    }

    public void setBedRoom(Integer bedRoom) {
        this.bedRoom = bedRoom;
    }

    public String getParking() {
        return parking;
    }

    public void setParking(String parking) {
        this.parking = parking;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public Float getLatitude() {
        return latitude;
    }

    public void setLatitude(Float latitude) {
        this.latitude = latitude;
    }

    public Float getLongitude() {
        return longitude;
    }

    public void setLongitude(Float longitude) {
        this.longitude = longitude;
    }

    public String getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(String updateAt) {
        this.updateAt = updateAt;
    }
}
