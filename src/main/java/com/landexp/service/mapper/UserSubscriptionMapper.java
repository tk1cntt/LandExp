package com.landexp.service.mapper;

import com.landexp.domain.*;
import com.landexp.service.dto.UserSubscriptionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity UserSubscription and its DTO UserSubscriptionDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, CityMapper.class, DistrictMapper.class})
public interface UserSubscriptionMapper extends EntityMapper<UserSubscriptionDTO, UserSubscription> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    @Mapping(source = "city.id", target = "cityId")
    @Mapping(source = "city.name", target = "cityName")
    @Mapping(source = "district.id", target = "districtId")
    @Mapping(source = "district.name", target = "districtName")
    UserSubscriptionDTO toDto(UserSubscription userSubscription);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "cityId", target = "city")
    @Mapping(source = "districtId", target = "district")
    UserSubscription toEntity(UserSubscriptionDTO userSubscriptionDTO);

    default UserSubscription fromId(Long id) {
        if (id == null) {
            return null;
        }
        UserSubscription userSubscription = new UserSubscription();
        userSubscription.setId(id);
        return userSubscription;
    }
}
