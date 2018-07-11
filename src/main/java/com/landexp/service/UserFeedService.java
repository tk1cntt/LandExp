package com.landexp.service;

import com.landexp.domain.UserFeed;
import com.landexp.repository.UserFeedRepository;
import com.landexp.service.dto.UserFeedDTO;
import com.landexp.service.mapper.UserFeedMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing UserFeed.
 */
@Service
@Transactional
public class UserFeedService {

    private final Logger log = LoggerFactory.getLogger(UserFeedService.class);

    private final UserFeedRepository userFeedRepository;

    private final UserFeedMapper userFeedMapper;

    public UserFeedService(UserFeedRepository userFeedRepository, UserFeedMapper userFeedMapper) {
        this.userFeedRepository = userFeedRepository;
        this.userFeedMapper = userFeedMapper;
    }

    /**
     * Save a userFeed.
     *
     * @param userFeedDTO the entity to save
     * @return the persisted entity
     */
    public UserFeedDTO save(UserFeedDTO userFeedDTO) {
        log.debug("Request to save UserFeed : {}", userFeedDTO);
        UserFeed userFeed = userFeedMapper.toEntity(userFeedDTO);
        userFeed = userFeedRepository.save(userFeed);
        return userFeedMapper.toDto(userFeed);
    }

    /**
     * Get all the userFeeds.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<UserFeedDTO> findAll(Pageable pageable) {
        log.debug("Request to get all UserFeeds");
        return userFeedRepository.findAll(pageable)
            .map(userFeedMapper::toDto);
    }


    /**
     * Get one userFeed by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<UserFeedDTO> findOne(Long id) {
        log.debug("Request to get UserFeed : {}", id);
        return userFeedRepository.findById(id)
            .map(userFeedMapper::toDto);
    }

    /**
     * Delete the userFeed by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete UserFeed : {}", id);
        userFeedRepository.deleteById(id);
    }
}
