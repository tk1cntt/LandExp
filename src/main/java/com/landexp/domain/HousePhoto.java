package com.landexp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A HousePhoto.
 */
@Entity
@Table(name = "house_photo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class HousePhoto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "image")
    private byte[] image;

    @Column(name = "image_content_type")
    private String imageContentType;

    @Column(name = "mobile_link")
    private String mobileLink;

    @Column(name = "web_link")
    private String webLink;

    @Column(name = "enabled")
    private Boolean enabled;

    @Column(name = "create_at")
    private LocalDate createAt;

    @ManyToOne
    @JsonIgnoreProperties("photos")
    private House house;

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

    public byte[] getImage() {
        return image;
    }

    public HousePhoto image(byte[] image) {
        this.image = image;
        return this;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public HousePhoto imageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
        return this;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public String getMobileLink() {
        return mobileLink;
    }

    public HousePhoto mobileLink(String mobileLink) {
        this.mobileLink = mobileLink;
        return this;
    }

    public void setMobileLink(String mobileLink) {
        this.mobileLink = mobileLink;
    }

    public String getWebLink() {
        return webLink;
    }

    public HousePhoto webLink(String webLink) {
        this.webLink = webLink;
        return this;
    }

    public void setWebLink(String webLink) {
        this.webLink = webLink;
    }

    public Boolean isEnabled() {
        return enabled;
    }

    public HousePhoto enabled(Boolean enabled) {
        this.enabled = enabled;
        return this;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public LocalDate getCreateAt() {
        return createAt;
    }

    public HousePhoto createAt(LocalDate createAt) {
        this.createAt = createAt;
        return this;
    }

    public void setCreateAt(LocalDate createAt) {
        this.createAt = createAt;
    }

    public House getHouse() {
        return house;
    }

    public HousePhoto house(House house) {
        this.house = house;
        return this;
    }

    public void setHouse(House house) {
        this.house = house;
    }

    public User getCreateBy() {
        return createBy;
    }

    public HousePhoto createBy(User user) {
        this.createBy = user;
        return this;
    }

    public void setCreateBy(User user) {
        this.createBy = user;
    }

    public User getUpdateBy() {
        return updateBy;
    }

    public HousePhoto updateBy(User user) {
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
        HousePhoto housePhoto = (HousePhoto) o;
        if (housePhoto.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), housePhoto.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "HousePhoto{" +
            "id=" + getId() +
            ", image='" + getImage() + "'" +
            ", imageContentType='" + getImageContentType() + "'" +
            ", mobileLink='" + getMobileLink() + "'" +
            ", webLink='" + getWebLink() + "'" +
            ", enabled='" + isEnabled() + "'" +
            ", createAt='" + getCreateAt() + "'" +
            "}";
    }
}
