package com.landexp.service;

import com.landexp.domain.LandProjectPhoto;
import com.landexp.repository.LandProjectPhotoRepository;
import com.landexp.service.dto.LandProjectPhotoDTO;
import com.landexp.service.mapper.LandProjectPhotoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing LandProjectPhoto.
 */
@Service
@Transactional
public class LandProjectPhotoService {

    private final Logger log = LoggerFactory.getLogger(LandProjectPhotoService.class);

    private final LandProjectPhotoRepository landProjectPhotoRepository;

    private final LandProjectPhotoMapper landProjectPhotoMapper;

    public LandProjectPhotoService(LandProjectPhotoRepository landProjectPhotoRepository, LandProjectPhotoMapper landProjectPhotoMapper) {
        this.landProjectPhotoRepository = landProjectPhotoRepository;
        this.landProjectPhotoMapper = landProjectPhotoMapper;
    }

    /**
     * Save a landProjectPhoto.
     *
     * @param landProjectPhotoDTO the entity to save
     * @return the persisted entity
     */
    public LandProjectPhotoDTO save(LandProjectPhotoDTO landProjectPhotoDTO) {
        log.debug("Request to save LandProjectPhoto : {}", landProjectPhotoDTO);
        LandProjectPhoto landProjectPhoto = landProjectPhotoMapper.toEntity(landProjectPhotoDTO);
        landProjectPhoto = landProjectPhotoRepository.save(landProjectPhoto);
        return landProjectPhotoMapper.toDto(landProjectPhoto);
    }

    /**
     * Get all the landProjectPhotos.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<LandProjectPhotoDTO> findAll() {
        log.debug("Request to get all LandProjectPhotos");
        return landProjectPhotoRepository.findAll().stream()
            .map(landProjectPhotoMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one landProjectPhoto by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<LandProjectPhotoDTO> findOne(Long id) {
        log.debug("Request to get LandProjectPhoto : {}", id);
        return landProjectPhotoRepository.findById(id)
            .map(landProjectPhotoMapper::toDto);
    }

    /**
     * Delete the landProjectPhoto by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete LandProjectPhoto : {}", id);
        landProjectPhotoRepository.deleteById(id);
    }
}
