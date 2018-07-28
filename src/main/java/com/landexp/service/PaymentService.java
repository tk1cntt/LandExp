package com.landexp.service;

import com.landexp.domain.Payment;
import com.landexp.domain.User;
import com.landexp.repository.PaymentRepository;
import com.landexp.repository.UserRepository;
import com.landexp.service.dto.PaymentDTO;
import com.landexp.service.mapper.PaymentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Payment.
 */
@Service
@Transactional
public class PaymentService {

    private final Logger log = LoggerFactory.getLogger(PaymentService.class);

    private final PaymentRepository paymentRepository;

    private final PaymentMapper paymentMapper;

    private final UserRepository userRepository;

    public PaymentService(PaymentRepository paymentRepository, PaymentMapper paymentMapper, UserRepository userRepository) {
        this.paymentRepository = paymentRepository;
        this.paymentMapper = paymentMapper;
        this.userRepository = userRepository;
    }

    /**
     * Save a payment.
     *
     * @param paymentDTO the entity to save
     * @return the persisted entity
     */
    public PaymentDTO save(PaymentDTO paymentDTO) {
        log.debug("Request to save Payment : {}", paymentDTO);
        Payment payment = paymentMapper.toEntity(paymentDTO);
        payment = paymentRepository.save(payment);
        return paymentMapper.toDto(payment);
    }

    /**
     * Save a payment.
     *
     * @param paymentDTO the entity to save
     * @return the persisted entity
     */
    public PaymentDTO saveByUsername(PaymentDTO paymentDTO, String username) {
        log.debug("Request to save House : {}", paymentDTO);
        Payment house = paymentMapper.toEntity(paymentDTO);
        Optional<User> existingUser = userRepository.findOneByLogin(username);
        house.setCreateBy(existingUser.get());
        house.setUpdateBy(existingUser.get());
        house = paymentRepository.save(house);
        return paymentMapper.toDto(house);
    }

    /**
     * Save a payment.
     *
     * @param paymentDTO the entity to save
     * @return the persisted entity
     */
    public PaymentDTO updateByUsername(PaymentDTO paymentDTO, String username) {
        log.debug("Request to save House : {}", paymentDTO);
        Payment house = paymentMapper.toEntity(paymentDTO);
        Optional<User> existingUser = userRepository.findOneByLogin(username);
        house.setUpdateBy(existingUser.get());
        house = paymentRepository.save(house);
        return paymentMapper.toDto(house);
    }

    /**
     * Get all the payments.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<PaymentDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Payments");
        return paymentRepository.findAll(pageable)
            .map(paymentMapper::toDto);
    }


    /**
     * Get one payment by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<PaymentDTO> findOne(Long id) {
        log.debug("Request to get Payment : {}", id);
        return paymentRepository.findById(id)
            .map(paymentMapper::toDto);
    }

    /**
     * Get one payment by house.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<PaymentDTO> findByHouse(Long id) {
        log.debug("Request to get Payment of House: {}", id);
        return paymentRepository.findFirstByHouseId(id)
            .map(paymentMapper::toDto);
    }

    /**
     * Delete the payment by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Payment : {}", id);
        paymentRepository.deleteById(id);
    }
}
