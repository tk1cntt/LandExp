package com.landexp.service.dto;

import com.landexp.domain.enumeration.StatusType;

import javax.persistence.Lob;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

/**
 * A DTO for the Article entity.
 */
public class ArticleMapDTO implements Serializable {

    private String key;
    private List<ArticleDTO> value;

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public List<ArticleDTO> getValue() {
        return value;
    }

    public void setValue(List<ArticleDTO> value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ArticleMapDTO articleDTO = (ArticleMapDTO) o;
        if (articleDTO.getKey() == null || getKey() == null) {
            return false;
        }
        return Objects.equals(getKey(), articleDTO.getKey());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getKey());
    }

    @Override
    public String toString() {
        return "ArticleDTO{" +
            "id=" + getKey() +
            "}";
    }
}
