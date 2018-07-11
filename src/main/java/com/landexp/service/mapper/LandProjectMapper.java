package com.landexp.service.mapper;

import com.landexp.domain.*;
import com.landexp.service.dto.LandProjectDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity LandProject and its DTO LandProjectDTO.
 */
@Mapper(componentModel = "spring", uses = {CityMapper.class, DistrictMapper.class, WardMapper.class, UserMapper.class})
public interface LandProjectMapper extends EntityMapper<LandProjectDTO, LandProject> {

    @Mapping(source = "city.id", target = "cityId")
    @Mapping(source = "city.name", target = "cityName")
    @Mapping(source = "district.id", target = "districtId")
    @Mapping(source = "district.name", target = "districtName")
    @Mapping(source = "ward.id", target = "wardId")
    @Mapping(source = "ward.name", target = "wardName")
    @Mapping(source = "createBy.id", target = "createById")
    @Mapping(source = "createBy.login", target = "createByLogin")
    @Mapping(source = "updateBy.id", target = "updateById")
    @Mapping(source = "updateBy.login", target = "updateByLogin")
    LandProjectDTO toDto(LandProject landProject);

    @Mapping(target = "photos", ignore = true)
    @Mapping(source = "cityId", target = "city")
    @Mapping(source = "districtId", target = "district")
    @Mapping(source = "wardId", target = "ward")
    @Mapping(source = "createById", target = "createBy")
    @Mapping(source = "updateById", target = "updateBy")
    LandProject toEntity(LandProjectDTO landProjectDTO);

    default LandProject fromId(Long id) {
        if (id == null) {
            return null;
        }
        LandProject landProject = new LandProject();
        landProject.setId(id);
        return landProject;
    }
}
