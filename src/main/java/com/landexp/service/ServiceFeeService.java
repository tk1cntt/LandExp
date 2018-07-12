package com.landexp.service;

import com.landexp.domain.ServiceFee;
import com.landexp.domain.enumeration.SaleType;
import com.landexp.repository.ServiceFeeRepository;
import com.landexp.service.dto.ServiceFeeDTO;
import com.landexp.service.mapper.ServiceFeeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing ServiceFee.
 */
@Service
@Transactional
public class ServiceFeeService {

    private final Logger log = LoggerFactory.getLogger(ServiceFeeService.class);

    private final ServiceFeeRepository serviceFeeRepository;

    private final ServiceFeeMapper serviceFeeMapper;

    public ServiceFeeService(ServiceFeeRepository serviceFeeRepository, ServiceFeeMapper serviceFeeMapper) {
        this.serviceFeeRepository = serviceFeeRepository;
        this.serviceFeeMapper = serviceFeeMapper;
    }

    /**
     * Save a serviceFee.
     *
     * @param serviceFeeDTO the entity to save
     * @return the persisted entity
     */
    public ServiceFeeDTO save(ServiceFeeDTO serviceFeeDTO) {
        log.debug("Request to save ServiceFee : {}", serviceFeeDTO);
        ServiceFee serviceFee = serviceFeeMapper.toEntity(serviceFeeDTO);
        serviceFee = serviceFeeRepository.save(serviceFee);
        return serviceFeeMapper.toDto(serviceFee);
    }

    /**
     * Get all the serviceFees.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ServiceFeeDTO> findAll() {
        log.debug("Request to get all ServiceFees");
        return serviceFeeRepository.findAll().stream()
            .map(serviceFeeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one serviceFee by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<ServiceFeeDTO> findOne(Long id) {
        log.debug("Request to get ServiceFee : {}", id);
        return serviceFeeRepository.findById(id)
            .map(serviceFeeMapper::toDto);
    }

    /**
     * Get one serviceFee by saleType.
     *
     * @param saleType the saleType of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<ServiceFeeDTO> findBySaleType(SaleType saleType) {
        log.debug("Request to get ServiceFee by sale type : {}", saleType);
        return serviceFeeRepository.findFirstBySaleType(saleType)
            .map(serviceFeeMapper::toDto);
    }

    /**
     * Delete the serviceFee by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ServiceFee : {}", id);
        serviceFeeRepository.deleteById(id);
    }
}
