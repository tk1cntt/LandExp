package com.landexp.service.mapper;

import com.landexp.domain.*;
import com.landexp.service.dto.RegionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Region and its DTO RegionDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface RegionMapper extends EntityMapper<RegionDTO, Region> {


    @Mapping(target = "districts", ignore = true)
    Region toEntity(RegionDTO regionDTO);

    default Region fromId(Long id) {
        if (id == null) {
            return null;
        }
        Region region = new Region();
        region.setId(id);
        return region;
    }
}
