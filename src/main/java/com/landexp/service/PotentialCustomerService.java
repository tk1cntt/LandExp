package com.landexp.service;

import com.landexp.domain.PotentialCustomer;
import com.landexp.repository.PotentialCustomerRepository;
import com.landexp.service.dto.PotentialCustomerDTO;
import com.landexp.service.mapper.PotentialCustomerMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing PotentialCustomer.
 */
@Service
@Transactional
public class PotentialCustomerService {

    private final Logger log = LoggerFactory.getLogger(PotentialCustomerService.class);

    private final PotentialCustomerRepository potentialCustomerRepository;

    private final PotentialCustomerMapper potentialCustomerMapper;

    public PotentialCustomerService(PotentialCustomerRepository potentialCustomerRepository, PotentialCustomerMapper potentialCustomerMapper) {
        this.potentialCustomerRepository = potentialCustomerRepository;
        this.potentialCustomerMapper = potentialCustomerMapper;
    }

    /**
     * Save a potentialCustomer.
     *
     * @param potentialCustomerDTO the entity to save
     * @return the persisted entity
     */
    public PotentialCustomerDTO save(PotentialCustomerDTO potentialCustomerDTO) {
        log.debug("Request to save PotentialCustomer : {}", potentialCustomerDTO);
        PotentialCustomer potentialCustomer = potentialCustomerMapper.toEntity(potentialCustomerDTO);
        potentialCustomer = potentialCustomerRepository.save(potentialCustomer);
        return potentialCustomerMapper.toDto(potentialCustomer);
    }

    /**
     * Get all the potentialCustomers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<PotentialCustomerDTO> findAll(Pageable pageable) {
        log.debug("Request to get all PotentialCustomers");
        return potentialCustomerRepository.findAll(pageable)
            .map(potentialCustomerMapper::toDto);
    }


    /**
     * Get one potentialCustomer by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<PotentialCustomerDTO> findOne(Long id) {
        log.debug("Request to get PotentialCustomer : {}", id);
        return potentialCustomerRepository.findById(id)
            .map(potentialCustomerMapper::toDto);
    }

    /**
     * Delete the potentialCustomer by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete PotentialCustomer : {}", id);
        potentialCustomerRepository.deleteById(id);
    }
}
