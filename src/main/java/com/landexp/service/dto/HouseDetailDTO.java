package com.landexp.service.dto;

import com.landexp.domain.enumeration.*;
import com.landexp.web.rest.responses.GooglePlaceResponse;

import javax.persistence.Lob;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

/**
 * A DTO for the House entity.
 */
public class HouseDetailDTO implements Serializable {

    private Long id;

    private String title;
    private String link;
    private String fullAddress;

    @Lob
    private byte[] avatar;
    private String avatarContentType;

    private String avatarLink;

    private UserActionType actionType;

    private String address;

    private Float money;

    private Float acreage;

    private Float acreageStreetSide;

    private Float discount;

    private DirectionType direction;

    private DirectionType directionBalcony;

    private String floor;

    private Float numberOfFloor;

    private Integer bathRoom;

    private Integer bedRoom;

    private Boolean parking;

    private String summary;

    private String summaryNoHtml;

    private LandType landType;

    private SaleType saleType;

    private Float fee;

    private Float feeMax;

    private PresentType present;

    private Integer hits;

    private String customer;

    private String mobile;

    private String email;

    private String facebook;

    private String zalo;

    private StatusType statusType;

    private String googleId;

    private Float latitude;

    private Float longitude;

    private Collection<GooglePlaceResponse> hospitals = new ArrayList<>();
    private Collection<GooglePlaceResponse> schools = new ArrayList<>();
    private Collection<GooglePlaceResponse> restaurants = new ArrayList<>();

    private LocalDate createAt;

    private LocalDate updateAt;

    private Long cityId;

    private String cityName;

    private Long districtId;

    private String districtName;

    private String districtType;

    private Long wardId;

    private String wardName;

    private String wardType;

    private Long projectId;

    private String projectName;

    private Long createById;

    private String createByLogin;

    private Long updateById;

    private String updateByLogin;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getFullAddress() {
        return fullAddress;
    }

    public void setFullAddress(String fullAddress) {
        this.fullAddress = fullAddress;
    }

    public byte[] getAvatar() {
        return avatar;
    }

    public void setAvatar(byte[] avatar) {
        this.avatar = avatar;
    }

    public String getAvatarContentType() {
        return avatarContentType;
    }

    public void setAvatarContentType(String avatarContentType) {
        this.avatarContentType = avatarContentType;
    }

    public String getAvatarLink() {
        return avatarLink;
    }

    public void setAvatarLink(String avatarLink) {
        this.avatarLink = avatarLink;
    }

    public UserActionType getActionType() {
        return actionType;
    }

    public void setActionType(UserActionType actionType) {
        this.actionType = actionType;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Float getMoney() {
        return money;
    }

    public void setMoney(Float money) {
        this.money = money;
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

    public DirectionType getDirection() {
        return direction;
    }

    public void setDirection(DirectionType direction) {
        this.direction = direction;
    }

    public DirectionType getDirectionBalcony() {
        return directionBalcony;
    }

    public void setDirectionBalcony(DirectionType directionBalcony) {
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

    public Boolean isParking() {
        return parking;
    }

    public void setParking(Boolean parking) {
        this.parking = parking;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getSummaryNoHtml() {
        return summaryNoHtml;
    }

    public void setSummaryNoHtml(String summaryNoHtml) {
        this.summaryNoHtml = summaryNoHtml;
    }

    public LandType getLandType() {
        return landType;
    }

    public void setLandType(LandType landType) {
        this.landType = landType;
    }

    public SaleType getSaleType() {
        return saleType;
    }

    public void setSaleType(SaleType saleType) {
        this.saleType = saleType;
    }

    public Float getFee() {
        return fee;
    }

    public void setFee(Float fee) {
        this.fee = fee;
    }

    public Float getFeeMax() {
        return feeMax;
    }

    public void setFeeMax(Float feeMax) {
        this.feeMax = feeMax;
    }

    public PresentType getPresent() {
        return present;
    }

    public void setPresent(PresentType present) {
        this.present = present;
    }

    public Integer getHits() {
        return hits;
    }

    public void setHits(Integer hits) {
        this.hits = hits;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFacebook() {
        return facebook;
    }

    public void setFacebook(String facebook) {
        this.facebook = facebook;
    }

    public String getZalo() {
        return zalo;
    }

    public void setZalo(String zalo) {
        this.zalo = zalo;
    }

    public StatusType getStatusType() {
        return statusType;
    }

    public void setStatusType(StatusType statusType) {
        this.statusType = statusType;
    }

    public String getGoogleId() {
        return googleId;
    }

    public void setGoogleId(String googleId) {
        this.googleId = googleId;
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

    public Collection<GooglePlaceResponse> getHospitals() {
        return hospitals;
    }

    public void setHospitals(Collection<GooglePlaceResponse> hospitals) {
        this.hospitals = hospitals;
    }

    public Collection<GooglePlaceResponse> getSchools() {
        return schools;
    }

    public void setSchools(Collection<GooglePlaceResponse> schools) {
        this.schools = schools;
    }

    public Collection<GooglePlaceResponse> getRestaurants() {
        return restaurants;
    }

    public void setRestaurants(Collection<GooglePlaceResponse> restaurants) {
        this.restaurants = restaurants;
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

    public Long getWardId() {
        return wardId;
    }

    public void setWardId(Long wardId) {
        this.wardId = wardId;
    }

    public String getWardName() {
        return wardName;
    }

    public void setWardName(String wardName) {
        this.wardName = wardName;
    }

    public String getDistrictType() {
        return districtType;
    }

    public void setDistrictType(String districtType) {
        this.districtType = districtType;
    }

    public String getWardType() {
        return wardType;
    }

    public void setWardType(String wardType) {
        this.wardType = wardType;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long landProjectId) {
        this.projectId = landProjectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String landProjectName) {
        this.projectName = landProjectName;
    }

    public Long getCreateById() {
        return createById;
    }

    public void setCreateById(Long userId) {
        this.createById = userId;
    }

    public String getCreateByLogin() {
        return createByLogin;
    }

    public void setCreateByLogin(String userLogin) {
        this.createByLogin = userLogin;
    }

    public Long getUpdateById() {
        return updateById;
    }

    public void setUpdateById(Long userId) {
        this.updateById = userId;
    }

    public String getUpdateByLogin() {
        return updateByLogin;
    }

    public void setUpdateByLogin(String userLogin) {
        this.updateByLogin = userLogin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        HouseDetailDTO houseDTO = (HouseDetailDTO) o;
        if (houseDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), houseDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "HouseDTO{" +
            "id=" + getId() +
            ", avatar='" + getAvatar() + "'" +
            ", avatarLink='" + getAvatarLink() + "'" +
            ", actionType='" + getActionType() + "'" +
            ", address='" + getAddress() + "'" +
            ", money=" + getMoney() +
            ", acreage=" + getAcreage() +
            ", acreageStreetSide=" + getAcreageStreetSide() +
            ", discount=" + getDiscount() +
            ", direction='" + getDirection() + "'" +
            ", directionBalcony='" + getDirectionBalcony() + "'" +
            ", floor='" + getFloor() + "'" +
            ", numberOfFloor=" + getNumberOfFloor() +
            ", bathRoom=" + getBathRoom() +
            ", bedRoom=" + getBedRoom() +
            ", parking='" + isParking() + "'" +
            ", summary='" + getSummary() + "'" +
            ", landType='" + getLandType() + "'" +
            ", saleType='" + getSaleType() + "'" +
            ", fee=" + getFee() +
            ", feeMax=" + getFeeMax() +
            ", present='" + getPresent() + "'" +
            ", hits=" + getHits() +
            ", customer='" + getCustomer() + "'" +
            ", mobile='" + getMobile() + "'" +
            ", email='" + getEmail() + "'" +
            ", facebook='" + getFacebook() + "'" +
            ", zalo='" + getZalo() + "'" +
            ", statusType='" + getStatusType() + "'" +
            ", googleId='" + getGoogleId() + "'" +
            ", latitude=" + getLatitude() +
            ", longitude=" + getLongitude() +
            ", createAt='" + getCreateAt() + "'" +
            ", updateAt='" + getUpdateAt() + "'" +
            ", city=" + getCityId() +
            ", city='" + getCityName() + "'" +
            ", district=" + getDistrictId() +
            ", district='" + getDistrictName() + "'" +
            ", ward=" + getWardId() +
            ", ward='" + getWardName() + "'" +
            ", project=" + getProjectId() +
            ", project='" + getProjectName() + "'" +
            ", createBy=" + getCreateById() +
            ", createBy='" + getCreateByLogin() + "'" +
            ", updateBy=" + getUpdateById() +
            ", updateBy='" + getUpdateByLogin() + "'" +
            "}";
    }
}
