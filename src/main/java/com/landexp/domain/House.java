package com.landexp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.landexp.domain.enumeration.UserActionType;

import com.landexp.domain.enumeration.DirectionType;

import com.landexp.domain.enumeration.LandType;

import com.landexp.domain.enumeration.SaleType;

import com.landexp.domain.enumeration.PresentType;

import com.landexp.domain.enumeration.StatusType;

/**
 * A House.
 */
@Entity
@Table(name = "house")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class House implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "avatar")
    private byte[] avatar;

    @Column(name = "avatar_content_type")
    private String avatarContentType;

    @Column(name = "avatar_link")
    private String avatarLink;

    @Enumerated(EnumType.STRING)
    @Column(name = "action_type")
    private UserActionType actionType;

    @Column(name = "address")
    private String address;

    @Column(name = "money")
    private Float money;

    @Column(name = "acreage")
    private Float acreage;

    @Column(name = "acreage_street_side")
    private Float acreageStreetSide;

    @Column(name = "discount")
    private Float discount;

    @Enumerated(EnumType.STRING)
    @Column(name = "direction")
    private DirectionType direction;

    @Enumerated(EnumType.STRING)
    @Column(name = "direction_balcony")
    private DirectionType directionBalcony;

    @Column(name = "floor")
    private String floor;

    @Column(name = "number_of_floor")
    private Float numberOfFloor;

    @Column(name = "bath_room")
    private Integer bathRoom;

    @Column(name = "bed_room")
    private Integer bedRoom;

    @Column(name = "parking")
    private Boolean parking;

    @Column(name = "summary")
    private String summary;

    @Enumerated(EnumType.STRING)
    @Column(name = "land_type")
    private LandType landType;

    @Enumerated(EnumType.STRING)
    @Column(name = "sale_type")
    private SaleType saleType;

    @Column(name = "fee")
    private Float fee;

    @Column(name = "fee_max")
    private Float feeMax;

    @Enumerated(EnumType.STRING)
    @Column(name = "present")
    private PresentType present;

    @Column(name = "hits")
    private Integer hits;

    @Column(name = "customer")
    private String customer;

    @Column(name = "mobile")
    private String mobile;

    @Column(name = "email")
    private String email;

    @Column(name = "facebook")
    private String facebook;

    @Column(name = "zalo")
    private String zalo;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_type")
    private StatusType statusType;

    @Column(name = "google_id")
    private String googleId;

    @Column(name = "latitude")
    private Float latitude;

    @Column(name = "longitude")
    private Float longitude;

    @Column(name = "create_at")
    private LocalDate createAt;

    @Column(name = "update_at")
    private LocalDate updateAt;

    @OneToMany(mappedBy = "house")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<HousePhoto> photos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("")
    private City city;

    @ManyToOne
    @JsonIgnoreProperties("")
    private District district;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Ward ward;

    @ManyToOne
    @JsonIgnoreProperties("")
    private LandProject project;

    @ManyToOne
    @JsonIgnoreProperties("")
    private User createBy;

    @ManyToOne
    @JsonIgnoreProperties("")
    private User updateBy;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getAvatar() {
        return avatar;
    }

    public House avatar(byte[] avatar) {
        this.avatar = avatar;
        return this;
    }

    public void setAvatar(byte[] avatar) {
        this.avatar = avatar;
    }

    public String getAvatarContentType() {
        return avatarContentType;
    }

    public House avatarContentType(String avatarContentType) {
        this.avatarContentType = avatarContentType;
        return this;
    }

    public void setAvatarContentType(String avatarContentType) {
        this.avatarContentType = avatarContentType;
    }

    public String getAvatarLink() {
        return avatarLink;
    }

    public House avatarLink(String avatarLink) {
        this.avatarLink = avatarLink;
        return this;
    }

    public void setAvatarLink(String avatarLink) {
        this.avatarLink = avatarLink;
    }

    public UserActionType getActionType() {
        return actionType;
    }

    public House actionType(UserActionType actionType) {
        this.actionType = actionType;
        return this;
    }

    public void setActionType(UserActionType actionType) {
        this.actionType = actionType;
    }

    public String getAddress() {
        return address;
    }

    public House address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Float getMoney() {
        return money;
    }

    public House money(Float money) {
        this.money = money;
        return this;
    }

    public void setMoney(Float money) {
        this.money = money;
    }

    public Float getAcreage() {
        return acreage;
    }

    public House acreage(Float acreage) {
        this.acreage = acreage;
        return this;
    }

    public void setAcreage(Float acreage) {
        this.acreage = acreage;
    }

    public Float getAcreageStreetSide() {
        return acreageStreetSide;
    }

    public House acreageStreetSide(Float acreageStreetSide) {
        this.acreageStreetSide = acreageStreetSide;
        return this;
    }

    public void setAcreageStreetSide(Float acreageStreetSide) {
        this.acreageStreetSide = acreageStreetSide;
    }

    public Float getDiscount() {
        return discount;
    }

    public House discount(Float discount) {
        this.discount = discount;
        return this;
    }

    public void setDiscount(Float discount) {
        this.discount = discount;
    }

    public DirectionType getDirection() {
        return direction;
    }

    public House direction(DirectionType direction) {
        this.direction = direction;
        return this;
    }

    public void setDirection(DirectionType direction) {
        this.direction = direction;
    }

    public DirectionType getDirectionBalcony() {
        return directionBalcony;
    }

    public House directionBalcony(DirectionType directionBalcony) {
        this.directionBalcony = directionBalcony;
        return this;
    }

    public void setDirectionBalcony(DirectionType directionBalcony) {
        this.directionBalcony = directionBalcony;
    }

    public String getFloor() {
        return floor;
    }

    public House floor(String floor) {
        this.floor = floor;
        return this;
    }

    public void setFloor(String floor) {
        this.floor = floor;
    }

    public Float getNumberOfFloor() {
        return numberOfFloor;
    }

    public House numberOfFloor(Float numberOfFloor) {
        this.numberOfFloor = numberOfFloor;
        return this;
    }

    public void setNumberOfFloor(Float numberOfFloor) {
        this.numberOfFloor = numberOfFloor;
    }

    public Integer getBathRoom() {
        return bathRoom;
    }

    public House bathRoom(Integer bathRoom) {
        this.bathRoom = bathRoom;
        return this;
    }

    public void setBathRoom(Integer bathRoom) {
        this.bathRoom = bathRoom;
    }

    public Integer getBedRoom() {
        return bedRoom;
    }

    public House bedRoom(Integer bedRoom) {
        this.bedRoom = bedRoom;
        return this;
    }

    public void setBedRoom(Integer bedRoom) {
        this.bedRoom = bedRoom;
    }

    public Boolean isParking() {
        return parking;
    }

    public House parking(Boolean parking) {
        this.parking = parking;
        return this;
    }

    public void setParking(Boolean parking) {
        this.parking = parking;
    }

    public String getSummary() {
        return summary;
    }

    public House summary(String summary) {
        this.summary = summary;
        return this;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public LandType getLandType() {
        return landType;
    }

    public House landType(LandType landType) {
        this.landType = landType;
        return this;
    }

    public void setLandType(LandType landType) {
        this.landType = landType;
    }

    public SaleType getSaleType() {
        return saleType;
    }

    public House saleType(SaleType saleType) {
        this.saleType = saleType;
        return this;
    }

    public void setSaleType(SaleType saleType) {
        this.saleType = saleType;
    }

    public Float getFee() {
        return fee;
    }

    public House fee(Float fee) {
        this.fee = fee;
        return this;
    }

    public void setFee(Float fee) {
        this.fee = fee;
    }

    public Float getFeeMax() {
        return feeMax;
    }

    public House feeMax(Float feeMax) {
        this.feeMax = feeMax;
        return this;
    }

    public void setFeeMax(Float feeMax) {
        this.feeMax = feeMax;
    }

    public PresentType getPresent() {
        return present;
    }

    public House present(PresentType present) {
        this.present = present;
        return this;
    }

    public void setPresent(PresentType present) {
        this.present = present;
    }

    public Integer getHits() {
        return hits;
    }

    public House hits(Integer hits) {
        this.hits = hits;
        return this;
    }

    public void setHits(Integer hits) {
        this.hits = hits;
    }

    public String getCustomer() {
        return customer;
    }

    public House customer(String customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public String getMobile() {
        return mobile;
    }

    public House mobile(String mobile) {
        this.mobile = mobile;
        return this;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getEmail() {
        return email;
    }

    public House email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFacebook() {
        return facebook;
    }

    public House facebook(String facebook) {
        this.facebook = facebook;
        return this;
    }

    public void setFacebook(String facebook) {
        this.facebook = facebook;
    }

    public String getZalo() {
        return zalo;
    }

    public House zalo(String zalo) {
        this.zalo = zalo;
        return this;
    }

    public void setZalo(String zalo) {
        this.zalo = zalo;
    }

    public StatusType getStatusType() {
        return statusType;
    }

    public House statusType(StatusType statusType) {
        this.statusType = statusType;
        return this;
    }

    public void setStatusType(StatusType statusType) {
        this.statusType = statusType;
    }

    public String getGoogleId() {
        return googleId;
    }

    public House googleId(String googleId) {
        this.googleId = googleId;
        return this;
    }

    public void setGoogleId(String googleId) {
        this.googleId = googleId;
    }

    public Float getLatitude() {
        return latitude;
    }

    public House latitude(Float latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(Float latitude) {
        this.latitude = latitude;
    }

    public Float getLongitude() {
        return longitude;
    }

    public House longitude(Float longitude) {
        this.longitude = longitude;
        return this;
    }

    public void setLongitude(Float longitude) {
        this.longitude = longitude;
    }

    public LocalDate getCreateAt() {
        return createAt;
    }

    public House createAt(LocalDate createAt) {
        this.createAt = createAt;
        return this;
    }

    public void setCreateAt(LocalDate createAt) {
        this.createAt = createAt;
    }

    public LocalDate getUpdateAt() {
        return updateAt;
    }

    public House updateAt(LocalDate updateAt) {
        this.updateAt = updateAt;
        return this;
    }

    public void setUpdateAt(LocalDate updateAt) {
        this.updateAt = updateAt;
    }

    public Set<HousePhoto> getPhotos() {
        return photos;
    }

    public House photos(Set<HousePhoto> housePhotos) {
        this.photos = housePhotos;
        return this;
    }

    public House addPhotos(HousePhoto housePhoto) {
        this.photos.add(housePhoto);
        housePhoto.setHouse(this);
        return this;
    }

    public House removePhotos(HousePhoto housePhoto) {
        this.photos.remove(housePhoto);
        housePhoto.setHouse(null);
        return this;
    }

    public void setPhotos(Set<HousePhoto> housePhotos) {
        this.photos = housePhotos;
    }

    public City getCity() {
        return city;
    }

    public House city(City city) {
        this.city = city;
        return this;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public District getDistrict() {
        return district;
    }

    public House district(District district) {
        this.district = district;
        return this;
    }

    public void setDistrict(District district) {
        this.district = district;
    }

    public Ward getWard() {
        return ward;
    }

    public House ward(Ward ward) {
        this.ward = ward;
        return this;
    }

    public void setWard(Ward ward) {
        this.ward = ward;
    }

    public LandProject getProject() {
        return project;
    }

    public House project(LandProject landProject) {
        this.project = landProject;
        return this;
    }

    public void setProject(LandProject landProject) {
        this.project = landProject;
    }

    public User getCreateBy() {
        return createBy;
    }

    public House createBy(User user) {
        this.createBy = user;
        return this;
    }

    public void setCreateBy(User user) {
        this.createBy = user;
    }

    public User getUpdateBy() {
        return updateBy;
    }

    public House updateBy(User user) {
        this.updateBy = user;
        return this;
    }

    public void setUpdateBy(User user) {
        this.updateBy = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        House house = (House) o;
        if (house.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), house.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "House{" +
            "id=" + getId() +
            ", avatar='" + getAvatar() + "'" +
            ", avatarContentType='" + getAvatarContentType() + "'" +
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
            "}";
    }
}
