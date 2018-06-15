package com.landexp.service.mapper;

import com.landexp.domain.*;
import com.landexp.service.dto.DistrictDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity District and its DTO DistrictDTO.
 */
@Mapper(componentModel = "spring", uses = {RegionMapper.class, CityMapper.class, WardMapper.class})
public interface DistrictMapper extends EntityMapper<DistrictDTO, District> {

    @Mapping(source = "region.id", target = "regionId")
    @Mapping(source = "city.id", target = "cityId")
    @Mapping(source = "city.name", target = "cityName")
    @Mapping(source = "ward.id", target = "wardId")
    DistrictDTO toDto(District district);

    @Mapping(source = "regionId", target = "region")
    @Mapping(target = "cities", ignore = true)
    @Mapping(target = "houses", ignore = true)
    @Mapping(source = "cityId", target = "city")
    @Mapping(source = "wardId", target = "ward")
    District toEntity(DistrictDTO districtDTO);

    default District fromId(Long id) {
        if (id == null) {
            return null;
        }
        District district = new District();
        district.setId(id);
        return district;
    }
}
