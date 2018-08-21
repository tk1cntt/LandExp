package com.landexp.service.mapper;

import com.landexp.domain.*;
import com.landexp.service.dto.UserLikeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity UserLike and its DTO UserLikeDTO.
 */
@Mapper(componentModel = "spring", uses = {HouseMapper.class, UserMapper.class})
public interface UserLikeMapper extends EntityMapper<UserLikeDTO, UserLike> {

    @Mapping(source = "house.id", target = "houseId")
    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    UserLikeDTO toDto(UserLike userLike);

    @Mapping(source = "houseId", target = "house")
    @Mapping(source = "userId", target = "user")
    UserLike toEntity(UserLikeDTO userLikeDTO);

    default UserLike fromId(Long id) {
        if (id == null) {
            return null;
        }
        UserLike userLike = new UserLike();
        userLike.setId(id);
        return userLike;
    }
}
