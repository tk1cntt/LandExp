package com.landexp.service.mapper;

import com.landexp.domain.*;
import com.landexp.service.dto.SearchTrackingDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SearchTracking and its DTO SearchTrackingDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, CityMapper.class, DistrictMapper.class})
public interface SearchTrackingMapper extends EntityMapper<SearchTrackingDTO, SearchTracking> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    @Mapping(source = "city.id", target = "cityId")
    @Mapping(source = "city.name", target = "cityName")
    @Mapping(source = "district.id", target = "districtId")
    @Mapping(source = "district.name", target = "districtName")
    SearchTrackingDTO toDto(SearchTracking searchTracking);

    @Mapping(source = "userId", target = "user")
    @Mapping(source = "cityId", target = "city")
    @Mapping(source = "districtId", target = "district")
    SearchTracking toEntity(SearchTrackingDTO searchTrackingDTO);

    default SearchTracking fromId(Long id) {
        if (id == null) {
            return null;
        }
        SearchTracking searchTracking = new SearchTracking();
        searchTracking.setId(id);
        return searchTracking;
    }
}
