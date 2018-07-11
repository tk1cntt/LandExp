package com.landexp.service;

import com.landexp.domain.UserFinancial;
import com.landexp.repository.UserFinancialRepository;
import com.landexp.service.dto.UserFinancialDTO;
import com.landexp.service.mapper.UserFinancialMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing UserFinancial.
 */
@Service
@Transactional
public class UserFinancialService {

    private final Logger log = LoggerFactory.getLogger(UserFinancialService.class);

    private final UserFinancialRepository userFinancialRepository;

    private final UserFinancialMapper userFinancialMapper;

    public UserFinancialService(UserFinancialRepository userFinancialRepository, UserFinancialMapper userFinancialMapper) {
        this.userFinancialRepository = userFinancialRepository;
        this.userFinancialMapper = userFinancialMapper;
    }

    /**
     * Save a userFinancial.
     *
     * @param userFinancialDTO the entity to save
     * @return the persisted entity
     */
    public UserFinancialDTO save(UserFinancialDTO userFinancialDTO) {
        log.debug("Request to save UserFinancial : {}", userFinancialDTO);
        UserFinancial userFinancial = userFinancialMapper.toEntity(userFinancialDTO);
        userFinancial = userFinancialRepository.save(userFinancial);
        return userFinancialMapper.toDto(userFinancial);
    }

    /**
     * Get all the userFinancials.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<UserFinancialDTO> findAll(Pageable pageable) {
        log.debug("Request to get all UserFinancials");
        return userFinancialRepository.findAll(pageable)
            .map(userFinancialMapper::toDto);
    }


    /**
     * Get one userFinancial by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<UserFinancialDTO> findOne(Long id) {
        log.debug("Request to get UserFinancial : {}", id);
        return userFinancialRepository.findById(id)
            .map(userFinancialMapper::toDto);
    }

    /**
     * Delete the userFinancial by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete UserFinancial : {}", id);
        userFinancialRepository.deleteById(id);
    }
}
