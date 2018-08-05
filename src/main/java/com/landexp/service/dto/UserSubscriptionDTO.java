package com.landexp.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;

import com.landexp.domain.enumeration.UserActionType;
import com.landexp.domain.enumeration.UserActivityType;
import com.landexp.domain.enumeration.DirectionType;
import com.landexp.domain.enumeration.LandType;

/**
 * A DTO for the UserSubscription entity.
 */
public class UserSubscriptionDTO implements Serializable {

    private Long id;

    private UserActionType actionType;

    private String keyword;

    private Float costFrom;

    private Float costTo;

    private Float acreageFrom;

    private Float acreageTo;

    private DirectionType direction;

    private String floor;

    private Integer bathRoom;

    private Integer bedRoom;

    private Boolean parking;

    private LandType landType;

    private Boolean enabled;

    private LocalDate createAt;

    private LocalDate updateAt;

    private Long userId;

    private String userLogin;

    private Long cityId;

    private String cityName;

    private Long districtId;

    private String districtName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserActionType getActionType() {
        return actionType;
    }

    public void setActionType(UserActionType actionType) {
        this.actionType = actionType;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public Float getCostFrom() {
        return costFrom;
    }

    public void setCostFrom(Float costFrom) {
        this.costFrom = costFrom;
    }

    public Float getCostTo() {
        return costTo;
    }

    public void setCostTo(Float costTo) {
        this.costTo = costTo;
    }

    public Float getAcreageFrom() {
        return acreageFrom;
    }

    public void setAcreageFrom(Float acreageFrom) {
        this.acreageFrom = acreageFrom;
    }

    public Float getAcreageTo() {
        return acreageTo;
    }

    public void setAcreageTo(Float acreageTo) {
        this.acreageTo = acreageTo;
    }

    public DirectionType getDirection() {
        return direction;
    }

    public void setDirection(DirectionType direction) {
        this.direction = direction;
    }

    public String getFloor() {
        return floor;
    }

    public void setFloor(String floor) {
        this.floor = floor;
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

    public Boolean isParking() {
        return parking;
    }

    public void setParking(Boolean parking) {
        this.parking = parking;
    }

    public LandType getLandType() {
        return landType;
    }

    public void setLandType(LandType landType) {
        this.landType = landType;
    }

    public Boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public LocalDate getCreateAt() {
        return createAt;
    }

    public void setCreateAt(LocalDate createAt) {
        this.createAt = createAt;
    }

    public LocalDate getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(LocalDate updateAt) {
        this.updateAt = updateAt;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserLogin() {
        return userLogin;
    }

    public void setUserLogin(String userLogin) {
        this.userLogin = userLogin;
    }

    public Long getCityId() {
        return cityId;
    }

    public void setCityId(Long cityId) {
        this.cityId = cityId;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public Long getDistrictId() {
        return districtId;
    }

    public void setDistrictId(Long districtId) {
        this.districtId = districtId;
    }

    public String getDistrictName() {
        return districtName;
    }

    public void setDistrictName(String districtName) {
        this.districtName = districtName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        UserSubscriptionDTO userSubscriptionDTO = (UserSubscriptionDTO) o;
        if (userSubscriptionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userSubscriptionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserSubscriptionDTO{" +
            "id=" + getId() +
            ", actionType='" + getActionType() + "'" +
            ", keyword='" + getKeyword() + "'" +
            ", costFrom=" + getCostFrom() +
            ", costTo=" + getCostTo() +
            ", acreageFrom=" + getAcreageFrom() +
            ", acreageTo=" + getAcreageTo() +
            ", direction='" + getDirection() + "'" +
            ", floor='" + getFloor() + "'" +
            ", bathRoom=" + getBathRoom() +
            ", bedRoom=" + getBedRoom() +
            ", parking='" + isParking() + "'" +
            ", landType='" + getLandType() + "'" +
            ", enabled='" + isEnabled() + "'" +
            ", createAt='" + getCreateAt() + "'" +
            ", updateAt='" + getUpdateAt() + "'" +
            ", user=" + getUserId() +
            ", user='" + getUserLogin() + "'" +
            ", city=" + getCityId() +
            ", city='" + getCityName() + "'" +
            ", district=" + getDistrictId() +
            ", district='" + getDistrictName() + "'" +
            "}";
    }
}
