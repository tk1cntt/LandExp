package com.landexp.service;

import com.landexp.domain.HousePhoto;
import com.landexp.repository.HousePhotoRepository;
import com.landexp.service.dto.HousePhotoDTO;
import com.landexp.service.mapper.HousePhotoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing HousePhoto.
 */
@Service
@Transactional
public class HousePhotoService {

    private final Logger log = LoggerFactory.getLogger(HousePhotoService.class);

    private final HousePhotoRepository housePhotoRepository;

    private final HousePhotoMapper housePhotoMapper;

    public HousePhotoService(HousePhotoRepository housePhotoRepository, HousePhotoMapper housePhotoMapper) {
        this.housePhotoRepository = housePhotoRepository;
        this.housePhotoMapper = housePhotoMapper;
    }

    /**
     * Save a housePhoto.
     *
     * @param housePhotoDTO the entity to save
     * @return the persisted entity
     */
    public HousePhotoDTO save(HousePhotoDTO housePhotoDTO) {
        log.debug("Request to save HousePhoto : {}", housePhotoDTO);
        HousePhoto housePhoto = housePhotoMapper.toEntity(housePhotoDTO);
        housePhoto = housePhotoRepository.save(housePhoto);
        return housePhotoMapper.toDto(housePhoto);
    }

    /**
     * Get all the housePhotos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<HousePhotoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all HousePhotos");
        return housePhotoRepository.findAll(pageable)
            .map(housePhotoMapper::toDto);
    }

    /**
     * Get all the housePhotos.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<HousePhotoDTO> findByHouse(Long id, Pageable pageable) {
        log.debug("Request to get photo of house {}", id);
        return housePhotoRepository.findByHouseId(id, pageable)
            .map(housePhotoMapper::toDto);
    }


    /**
     * Get one housePhoto by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<HousePhotoDTO> findOne(Long id) {
        log.debug("Request to get HousePhoto : {}", id);
        return housePhotoRepository.findById(id)
            .map(housePhotoMapper::toDto);
    }

    /**
     * Delete the housePhoto by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete HousePhoto : {}", id);
        housePhotoRepository.deleteById(id);
    }
}
