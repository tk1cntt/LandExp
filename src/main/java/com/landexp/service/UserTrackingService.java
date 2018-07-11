package com.landexp.service;

import com.landexp.domain.UserTracking;
import com.landexp.repository.UserTrackingRepository;
import com.landexp.service.dto.UserTrackingDTO;
import com.landexp.service.mapper.UserTrackingMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing UserTracking.
 */
@Service
@Transactional
public class UserTrackingService {

    private final Logger log = LoggerFactory.getLogger(UserTrackingService.class);

    private final UserTrackingRepository userTrackingRepository;

    private final UserTrackingMapper userTrackingMapper;

    public UserTrackingService(UserTrackingRepository userTrackingRepository, UserTrackingMapper userTrackingMapper) {
        this.userTrackingRepository = userTrackingRepository;
        this.userTrackingMapper = userTrackingMapper;
    }

    /**
     * Save a userTracking.
     *
     * @param userTrackingDTO the entity to save
     * @return the persisted entity
     */
    public UserTrackingDTO save(UserTrackingDTO userTrackingDTO) {
        log.debug("Request to save UserTracking : {}", userTrackingDTO);
        UserTracking userTracking = userTrackingMapper.toEntity(userTrackingDTO);
        userTracking = userTrackingRepository.save(userTracking);
        return userTrackingMapper.toDto(userTracking);
    }

    /**
     * Get all the userTrackings.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<UserTrackingDTO> findAll(Pageable pageable) {
        log.debug("Request to get all UserTrackings");
        return userTrackingRepository.findAll(pageable)
            .map(userTrackingMapper::toDto);
    }


    /**
     * Get one userTracking by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<UserTrackingDTO> findOne(Long id) {
        log.debug("Request to get UserTracking : {}", id);
        return userTrackingRepository.findById(id)
            .map(userTrackingMapper::toDto);
    }

    /**
     * Delete the userTracking by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete UserTracking : {}", id);
        userTrackingRepository.deleteById(id);
    }
}
