package com.landexp.responses;

import com.landexp.service.dto.HousePhotoDTO;

import javax.persistence.Lob;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DTO for the HousePhoto entity.
 */
public class HousePhotoResponse implements Serializable {

    private Long id;

    private String mobileLink;

    private String webLink;

    private Long houseId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMobileLink() {
        return mobileLink;
    }

    public void setMobileLink(String mobileLink) {
        this.mobileLink = mobileLink;
    }

    public String getWebLink() {
        return webLink;
    }

    public void setWebLink(String webLink) {
        this.webLink = webLink;
    }

    public Long getHouseId() {
        return houseId;
    }

    public void setHouseId(Long houseId) {
        this.houseId = houseId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        HousePhotoDTO housePhotoDTO = (HousePhotoDTO) o;
        if (housePhotoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), housePhotoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "HousePhotoDTO{" +
            "id=" + getId() +
            ", mobileLink='" + getMobileLink() + "'" +
            ", webLink='" + getWebLink() + "'" +
            ", house=" + getHouseId() +
            "}";
    }
}
