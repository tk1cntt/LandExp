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
    private String title;
    private String categoryName;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
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
            ", category='" + getCategoryName() + "'" +
            "}";
    }
}
