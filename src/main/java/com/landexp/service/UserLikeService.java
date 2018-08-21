package com.landexp.service;

import com.landexp.domain.UserLike;
import com.landexp.repository.UserLikeRepository;
import com.landexp.service.dto.UserLikeDTO;
import com.landexp.service.mapper.UserLikeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing UserLike.
 */
@Service
@Transactional
public class UserLikeService {

    private final Logger log = LoggerFactory.getLogger(UserLikeService.class);

    private final UserLikeRepository userLikeRepository;

    private final UserLikeMapper userLikeMapper;

    public UserLikeService(UserLikeRepository userLikeRepository, UserLikeMapper userLikeMapper) {
        this.userLikeRepository = userLikeRepository;
        this.userLikeMapper = userLikeMapper;
    }

    /**
     * Save a userLike.
     *
     * @param userLikeDTO the entity to save
     * @return the persisted entity
     */
    public UserLikeDTO save(UserLikeDTO userLikeDTO) {
        log.debug("Request to save UserLike : {}", userLikeDTO);
        UserLike userLike = userLikeMapper.toEntity(userLikeDTO);
        userLike = userLikeRepository.save(userLike);
        return userLikeMapper.toDto(userLike);
    }

    /**
     * Get all the userLikes.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<UserLikeDTO> findAll() {
        log.debug("Request to get all UserLikes");
        return userLikeRepository.findAll().stream()
            .map(userLikeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one userLike by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<UserLikeDTO> findOne(Long id) {
        log.debug("Request to get UserLike : {}", id);
        return userLikeRepository.findById(id)
            .map(userLikeMapper::toDto);
    }

    /**
     * Delete the userLike by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete UserLike : {}", id);
        userLikeRepository.deleteById(id);
    }
}
