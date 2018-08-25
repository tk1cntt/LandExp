package com.landexp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A UserLike.
 */
@Entity
@Table(name = "user_like")
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserLike implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_type")
    private Integer userType;

    @CreationTimestamp
    @Column(name = "create_at")
    private LocalDate createAt;

    @ManyToOne
    @JsonIgnoreProperties("")
    private House house;

    @ManyToOne
    @JsonIgnoreProperties("")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getUserType() {
        return userType;
    }

    public UserLike userType(Integer userType) {
        this.userType = userType;
        return this;
    }

    public void setUserType(Integer userType) {
        this.userType = userType;
    }

    public LocalDate getCreateAt() {
        return createAt;
    }

    public UserLike createAt(LocalDate createAt) {
        this.createAt = createAt;
        return this;
    }

    public void setCreateAt(LocalDate createAt) {
        this.createAt = createAt;
    }

    public House getHouse() {
        return house;
    }

    public UserLike house(House house) {
        this.house = house;
        return this;
    }

    public void setHouse(House house) {
        this.house = house;
    }

    public User getUser() {
        return user;
    }

    public UserLike user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
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
        UserLike userLike = (UserLike) o;
        if (userLike.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userLike.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserLike{" +
            "id=" + getId() +
            ", createAt='" + getCreateAt() + "'" +
            "}";
    }
}
