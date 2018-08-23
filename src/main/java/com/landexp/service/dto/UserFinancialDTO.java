package com.landexp.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the UserFinancial entity.
 */
public class UserFinancialDTO implements Serializable {

    private Long id;

    private Float housePrice;

    private Float savingMoney;

    private Float loanRate;

    private Float loanFromPeople;

    private Float customerMoneyHave;

    private Integer financialType;

    private String customerMobile;

    private String customerEmail;

    private Long userId;

    private String userLogin;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getHousePrice() {
        return housePrice;
    }

    public void setHousePrice(Float housePrice) {
        this.housePrice = housePrice;
    }

    public Float getSavingMoney() {
        return savingMoney;
    }

    public void setSavingMoney(Float savingMoney) {
        this.savingMoney = savingMoney;
    }

    public Float getLoanRate() {
        return loanRate;
    }

    public void setLoanRate(Float loanRate) {
        this.loanRate = loanRate;
    }

    public Float getLoanFromPeople() {
        return loanFromPeople;
    }

    public void setLoanFromPeople(Float loanFromPeople) {
        this.loanFromPeople = loanFromPeople;
    }

    public Float getCustomerMoneyHave() {
        return customerMoneyHave;
    }

    public void setCustomerMoneyHave(Float customerMoneyHave) {
        this.customerMoneyHave = customerMoneyHave;
    }

    public Integer getFinancialType() {
        return financialType;
    }

    public void setFinancialType(Integer financialType) {
        this.financialType = financialType;
    }

    public String getCustomerMobile() {
        return customerMobile;
    }

    public void setCustomerMobile(String customerMobile) {
        this.customerMobile = customerMobile;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        UserFinancialDTO userFinancialDTO = (UserFinancialDTO) o;
        if (userFinancialDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), userFinancialDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UserFinancialDTO{" +
            "id=" + getId() +
            ", housePrice=" + getHousePrice() +
            ", savingMoney=" + getSavingMoney() +
            ", loanRate=" + getLoanRate() +
            ", loanFromPeople=" + getLoanFromPeople() +
            ", customerMoneyHave=" + getCustomerMoneyHave() +
            ", customerMobile='" + getCustomerMobile() + "'" +
            ", customerEmail='" + getCustomerEmail() + "'" +
            ", user=" + getUserId() +
            ", user='" + getUserLogin() + "'" +
            "}";
    }
}
