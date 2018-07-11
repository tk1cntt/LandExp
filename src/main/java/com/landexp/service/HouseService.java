package com.landexp.service;

import com.landexp.domain.House;
import com.landexp.repository.HouseRepository;
import com.landexp.service.dto.HouseDTO;
import com.landexp.service.mapper.HouseMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing House.
 */
@Service
@Transactional
public class HouseService {

    private final Logger log = LoggerFactory.getLogger(HouseService.class);

    private final HouseRepository houseRepository;

    private final HouseMapper houseMapper;

    public HouseService(HouseRepository houseRepository, HouseMapper houseMapper) {
        this.houseRepository = houseRepository;
        this.houseMapper = houseMapper;
    }

    /**
     * Save a house.
     *
     * @param houseDTO the entity to save
     * @return the persisted entity
     */
    public HouseDTO save(HouseDTO houseDTO) {
        log.debug("Request to save House : {}", houseDTO);
        House house = houseMapper.toEntity(houseDTO);
        house = houseRepository.save(house);
        return houseMapper.toDto(house);
    }

    /**
     * Get all the houses.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<HouseDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Houses");
        return houseRepository.findAll(pageable)
            .map(houseMapper::toDto);
    }


    /**
     * Get one house by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<HouseDTO> findOne(Long id) {
        log.debug("Request to get House : {}", id);
        return houseRepository.findById(id)
            .map(houseMapper::toDto);
    }

    /**
     * Delete the house by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete House : {}", id);
        houseRepository.deleteById(id);
    }
}
