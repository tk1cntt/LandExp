package com.landexp.service.mapper;

import com.landexp.domain.*;
import com.landexp.service.dto.StreetDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Street and its DTO StreetDTO.
 */
@Mapper(componentModel = "spring", uses = {WardMapper.class})
public interface StreetMapper extends EntityMapper<StreetDTO, Street> {

    @Mapping(source = "ward.id", target = "wardId")
    StreetDTO toDto(Street street);

    @Mapping(source = "wardId", target = "ward")
    Street toEntity(StreetDTO streetDTO);

    default Street fromId(Long id) {
        if (id == null) {
            return null;
        }
        Street street = new Street();
        street.setId(id);
        return street;
    }
}
