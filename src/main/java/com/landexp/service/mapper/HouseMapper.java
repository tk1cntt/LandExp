package com.landexp.service.mapper;

import com.landexp.domain.*;
import com.landexp.frontend.responses.MappingUtils;
import com.landexp.service.dto.HouseDTO;

import com.landexp.service.dto.HouseDetailDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity House and its DTO HouseDTO.
 */
@Mapper(componentModel = "spring", uses = {CityMapper.class, DistrictMapper.class, WardMapper.class, LandProjectMapper.class, UserMapper.class})
public interface HouseMapper extends EntityMapper<HouseDTO, House> {

    @Mapping(source = "city.name", target = "cityName")
    @Mapping(source = "district.name", target = "districtName")
    @Mapping(source = "ward.name", target = "wardName")
    @Mapping(source = "project.name", target = "projectName")
    @Mapping(source = "createBy.login", target = "createByLogin")
    HouseDTO toDto(House house);

    @Mapping(target = "photos", ignore = true)
    @Mapping(source = "cityId", target = "city")
    @Mapping(source = "districtId", target = "district")
    @Mapping(source = "wardId", target = "ward")
    @Mapping(source = "projectId", target = "project")
    @Mapping(source = "createById", target = "createBy")
    @Mapping(source = "updateById", target = "updateBy")
    House toEntity(HouseDetailDTO houseDTO);

    @Mapping(source = "city.id", target = "cityId")
    @Mapping(source = "city.name", target = "cityName")
    @Mapping(source = "district.id", target = "districtId")
    @Mapping(source = "district.name", target = "districtName")
    @Mapping(source = "district.type", target = "districtType")
    @Mapping(source = "ward.id", target = "wardId")
    @Mapping(source = "ward.name", target = "wardName")
    @Mapping(source = "ward.type", target = "wardType")
    @Mapping(source = "project.id", target = "projectId")
    @Mapping(source = "project.name", target = "projectName")
    @Mapping(source = "createBy.id", target = "createById")
    @Mapping(source = "createBy.login", target = "createByLogin")
    @Mapping(source = "updateBy.id", target = "updateById")
    @Mapping(source = "updateBy.login", target = "updateByLogin")
    HouseDetailDTO toDetailDto(House house);

    default House fromId(Long id) {
        if (id == null) {
            return null;
        }
        House house = new House();
        house.setId(id);
        return house;
    }

    @AfterMapping
    default void addMores(@MappingTarget HouseDetailDTO dto) {
        dto.setTitle(MappingUtils.formatTitle(dto));
        dto.setFullAddress(MappingUtils.formatFullAddress(dto));
        dto.setLink(MappingUtils.formatLink(dto));
    }

    @AfterMapping
    default void addMores(@MappingTarget HouseDTO dto) {
        dto.setLink(MappingUtils.formatLink(dto));
    }
}
