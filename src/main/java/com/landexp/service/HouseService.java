package com.landexp.service;

import com.landexp.domain.House;
import com.landexp.domain.User;
import com.landexp.domain.enumeration.StatusType;
import com.landexp.repository.HouseRepository;
import com.landexp.repository.UserRepository;
import com.landexp.service.dto.HouseDTO;
import com.landexp.service.dto.HouseDetailDTO;
import com.landexp.service.mapper.HouseMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;


import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing House.
 */
@Service
@Transactional
public class HouseService {

    private final Logger log = LoggerFactory.getLogger(HouseService.class);

    private final HouseRepository houseRepository;

    private final HouseMapper houseMapper;


    private final UserRepository userRepository;

    public HouseService(HouseRepository houseRepository, HouseMapper houseMapper, UserRepository userRepository) {
        this.houseRepository = houseRepository;
        this.houseMapper = houseMapper;
        this.userRepository = userRepository;
    }

    /**
     * Save a house.
     *
     * @param houseDTO the entity to save
     * @return the persisted entity
     */
    public HouseDetailDTO save(HouseDetailDTO houseDTO) {
        log.debug("Request to save House : {}", houseDTO);
        House house = houseMapper.toEntity(houseDTO);
        house = houseRepository.save(house);
        return houseMapper.toDetailDto(house);
    }

    /**
     * Save a house.
     *
     * @param houseDTO the entity to save
     * @return the persisted entity
     */
    public HouseDetailDTO saveByUsername(HouseDetailDTO houseDTO, String username) {
        log.debug("Request to save House : {}", houseDTO);
        House house = houseMapper.toEntity(houseDTO);
        Optional<User> existingUser = userRepository.findOneByLogin(username);
        house.setCreateBy(existingUser.get());
        house.setUpdateBy(existingUser.get());
        house = houseRepository.save(house);
        return houseMapper.toDetailDto(house);
    }

    /**
     * Save a house.
     *
     * @param houseDTO the entity to save
     * @return the persisted entity
     */
    public HouseDetailDTO updateByUsername(HouseDetailDTO houseDTO, String username) {
        log.debug("Request to save House : {}", houseDTO);
        House house = houseMapper.toEntity(houseDTO);
        Optional<User> existingUser = userRepository.findOneByLogin(username);
        house.setUpdateBy(existingUser.get());
        house = houseRepository.save(house);
        return houseMapper.toDetailDto(house);
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
        return houseRepository.findByStatusTypeNotOrderByCreateAtDesc(StatusType.OPEN, pageable)
            .map(houseMapper::toDto);
    }

    /**
     * Get top the houses.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<HouseDTO> findTop() {
        log.debug("Request to get top Houses");
        return houseRepository.findTop8OrderByCreateAtDesc().stream()
            .map(houseMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get init the houses.
     *
     * @return the persisted entity
     */
    @Transactional(readOnly = true)
    public HouseDetailDTO initHouse(String username) {
        log.debug("Request to get init House {}", username);
        House house = houseRepository.findFirstByStatusTypeAndCreateByLogin(StatusType.OPEN, username);
        if (!ObjectUtils.isEmpty(house)) {
            return houseMapper.toDetailDto(house);
        } else {
            return null;
        }
    }

    /**
     * Get all the house of staff.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<HouseDTO> findByStaff(String username, Pageable pageable) {
        log.debug("Request to get all House of staff [{}]", username);
        return houseRepository.findByStatusTypeNotAndDistrictRegionUsersLoginOrderByCreateAtDesc(StatusType.OPEN, username, pageable)
            .map(houseMapper::toDto);
    }

    /**
     * Get all the house of staff.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<HouseDTO> findByOwner(String username, Pageable pageable) {
        log.debug("Request to get all House of owner [{}]", username);
        return houseRepository.findByStatusTypeNotAndCreateByLoginOrderByCreateAtDesc(StatusType.OPEN, username, pageable)
            .map(houseMapper::toDto);
    }

    /**
     * Get one house by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<HouseDetailDTO> findOne(Long id) {
        log.debug("Request to get House : {}", id);
        return houseRepository.findById(id)
            .map(houseMapper::toDetailDto);
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
