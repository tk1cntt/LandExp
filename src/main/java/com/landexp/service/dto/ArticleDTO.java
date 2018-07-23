package com.landexp.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;
import com.landexp.domain.enumeration.StatusType;

/**
 * A DTO for the Article entity.
 */
public class ArticleDTO implements Serializable {

    private Long id;

    private String link;

    @Lob
    private byte[] avatar;
    private String avatarContentType;

    private String title;

    private Boolean enabled;

    private StatusType statusType;

    private Integer hits;

    private LocalDate createAt;

    private LocalDate updateAt;

    private String categoryName;

    private String createByLogin;

    private String updateByLogin;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public StatusType getStatusType() {
        return statusType;
    }

    public void setStatusType(StatusType statusType) {
        this.statusType = statusType;
    }

    public Integer getHits() {
        return hits;
    }

    public void setHits(Integer hits) {
        this.hits = hits;
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

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCreateByLogin() {
        return createByLogin;
    }

    public void setCreateByLogin(String userLogin) {
        this.createByLogin = userLogin;
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

        ArticleDTO articleDTO = (ArticleDTO) o;
        if (articleDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), articleDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ArticleDTO{" +
            "id=" + getId() +
            ", link='" + getLink() + "'" +
            ", title='" + getTitle() + "'" +
            ", statusType='" + getStatusType() + "'" +
            ", hits=" + getHits() +
            ", createAt='" + getCreateAt() + "'" +
            ", updateAt='" + getUpdateAt() + "'" +
            ", category='" + getCategoryName() + "'" +
            ", createBy='" + getCreateByLogin() + "'" +
            ", updateBy='" + getUpdateByLogin() + "'" +
            "}";
    }
}
