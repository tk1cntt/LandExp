package com.landexp.service.mapper;

import com.landexp.domain.*;
import com.landexp.service.dto.WardDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Ward and its DTO WardDTO.
 */
@Mapper(componentModel = "spring", uses = {DistrictMapper.class, StreetMapper.class})
public interface WardMapper extends EntityMapper<WardDTO, Ward> {

    @Mapping(source = "district.id", target = "districtId")
    @Mapping(source = "district.name", target = "districtName")
    @Mapping(source = "streets", target = "streets")
    WardDTO toDto(Ward ward);

    @Mapping(source = "districtId", target = "district")
    @Mapping(target = "streets", ignore = true)
    Ward toEntity(WardDTO wardDTO);

    default Ward fromId(Long id) {
        if (id == null) {
            return null;
        }
        Ward ward = new Ward();
        ward.setId(id);
        return ward;
    }
}
