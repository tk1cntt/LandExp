package com.landexp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.landexp.domain.enumeration.PaymentStatusType;
import com.landexp.domain.enumeration.StatusType;
import com.landexp.security.AuthoritiesConstants;
import com.landexp.security.SecurityUtils;
import com.landexp.service.HouseService;
import com.landexp.service.PaymentQueryService;
import com.landexp.service.PaymentService;
import com.landexp.service.dto.HouseDetailDTO;
import com.landexp.service.dto.PaymentCriteria;
import com.landexp.service.dto.PaymentDTO;
import com.landexp.web.rest.errors.BadRequestAlertException;
import com.landexp.web.rest.util.HeaderUtil;
import com.landexp.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Payment.
 */
@RestController
@RequestMapping("/api")
public class PaymentResource {

    private static final String ENTITY_NAME = "payment";
    private final Logger log = LoggerFactory.getLogger(PaymentResource.class);
    private final PaymentService paymentService;

    private final HouseService houseService;

    private final PaymentQueryService paymentQueryService;

    public PaymentResource(PaymentService paymentService, PaymentQueryService paymentQueryService, HouseService houseService) {
        this.paymentService = paymentService;
        this.paymentQueryService = paymentQueryService;
        this.houseService = houseService;
    }

    /**
     * POST  /payments : Create a new payment.
     *
     * @param paymentDTO the paymentDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new paymentDTO, or with status 400 (Bad Request) if the payment has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/payments")
    @Timed
    public ResponseEntity<PaymentDTO> createPayment(@RequestBody PaymentDTO paymentDTO) throws URISyntaxException {
        log.debug("REST request to save Payment : {}", paymentDTO);
        if (paymentDTO.getId() != null) {
            throw new BadRequestAlertException("A new payment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        String username = SecurityUtils.getCurrentUserLogin().get();
        PaymentDTO result = paymentService.saveByUsername(paymentDTO, username);
        return ResponseEntity.created(new URI("/api/payments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /payments : Updates an existing payment.
     *
     * @param paymentDTO the paymentDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated paymentDTO,
     * or with status 400 (Bad Request) if the paymentDTO is not valid,
     * or with status 500 (Internal Server Error) if the paymentDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/payments")
    @Timed
    public ResponseEntity<PaymentDTO> updatePayment(@RequestBody PaymentDTO paymentDTO) throws URISyntaxException {
        log.debug("REST request to update Payment : {}", paymentDTO);
        if (paymentDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        String username = SecurityUtils.getCurrentUserLogin().get();
        PaymentDTO result = paymentService.updateByUsername(paymentDTO, username);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, paymentDTO.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /payments/<id>/approve : Approve an existing payment.
     *
     * @param id the id of payment
     * @return the ResponseEntity with status 200 (OK) and with body the updated paymentDTO,
     * or with status 400 (Bad Request) if the paymentDTO is not valid,
     * or with status 500 (Internal Server Error) if the paymentDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/payments/{id}/approve")
    @Timed
    @Secured(AuthoritiesConstants.STAFF)
    public ResponseEntity<PaymentDTO> approvePayment(@PathVariable Long id) throws URISyntaxException {
        log.debug("REST request to approve Payment : {}", id);
        PaymentDTO paymentDTO = paymentService.findOne(id).get();
        if (ObjectUtils.isEmpty(paymentDTO)) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HouseDetailDTO houseDTO = houseService.findOne(paymentDTO.getHouseId()).get();
        if (ObjectUtils.isEmpty(houseDTO)) {
            throw new BadRequestAlertException("Not Found " + id, ENTITY_NAME, "notfound");
        }
        String username = SecurityUtils.getCurrentUserLogin().get();
        paymentDTO.setPaymentStatus(PaymentStatusType.PAID);
        paymentDTO.setPaidTime(LocalDate.now());
        PaymentDTO result = paymentService.updateByUsername(paymentDTO, username);
        houseDTO.setStatusType(StatusType.PAID);
        houseService.updateByUsername(houseDTO, username);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /payments/<id>/approve : Cancel an existing payment.
     *
     * @param id the id of payment
     * @return the ResponseEntity with status 200 (OK) and with body the updated paymentDTO,
     * or with status 400 (Bad Request) if the paymentDTO is not valid,
     * or with status 500 (Internal Server Error) if the paymentDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/payments/{id}/cancel")
    @Timed
    @Secured(AuthoritiesConstants.STAFF)
    public ResponseEntity<PaymentDTO> cancelPayment(@PathVariable Long id) throws URISyntaxException {
        log.debug("REST request to cancel Payment : {}", id);
        PaymentDTO paymentDTO = paymentService.findOne(id).get();
        if (ObjectUtils.isEmpty(paymentDTO)) {
            throw new BadRequestAlertException("Not Found " + id, ENTITY_NAME, "notfound");
        }
        HouseDetailDTO houseDTO = houseService.findOne(paymentDTO.getHouseId()).get();
        if (ObjectUtils.isEmpty(houseDTO)) {
            throw new BadRequestAlertException("Not Found " + id, ENTITY_NAME, "notfound");
        }
        String username = SecurityUtils.getCurrentUserLogin().get();
        paymentDTO.setPaymentStatus(PaymentStatusType.CANCELED);
        PaymentDTO result = paymentService.updateByUsername(paymentDTO, username);
        houseDTO.setStatusType(StatusType.CANCELED);
        houseService.updateByUsername(houseDTO, username);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * GET  /payments : get all the payments.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of payments in body
     */
    @GetMapping("/payments")
    @Timed
    public ResponseEntity<List<PaymentDTO>> getAllPayments(PaymentCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Payments by criteria: {}", criteria);
        PaymentCriteria.PaymentStatusTypeFilter filter = new PaymentCriteria.PaymentStatusTypeFilter();
        if (ObjectUtils.isEmpty(criteria.getPaymentStatus())) {
            List<PaymentStatusType> statusTypes = new ArrayList<>();
            statusTypes.add(PaymentStatusType.PENDING);
            statusTypes.add(PaymentStatusType.CANCELED);
            statusTypes.add(PaymentStatusType.PAID);
            filter.setIn(statusTypes);
            criteria.setPaymentStatus(filter);
        }
        Page<PaymentDTO> page = paymentQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/payments");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /houses/:id/payments : get payment of house.
     *
     * @param id the id of the houseDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the paymentDTO, or with status 404 (Not Found)
     */
    @GetMapping("/payments/{id}/houses")
    @Timed
    public ResponseEntity<PaymentDTO> getPaymentOfHouse(@PathVariable Long id) {
        log.debug("REST request to get Payment : {}", id);
        Optional<PaymentDTO> paymentDTO = paymentService.findByHouse(id);
        return ResponseUtil.wrapOrNotFound(paymentDTO);
    }

    /**
     * GET  /payments/:id : get the "id" payment.
     *
     * @param id the id of the paymentDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the paymentDTO, or with status 404 (Not Found)
     */
    @GetMapping("/payments/{id}")
    @Timed
    public ResponseEntity<PaymentDTO> getPayment(@PathVariable Long id) {
        log.debug("REST request to get Payment : {}", id);
        Optional<PaymentDTO> paymentDTO = paymentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(paymentDTO);
    }

    /**
     * DELETE  /payments/:id : delete the "id" payment.
     *
     * @param id the id of the paymentDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/payments/{id}")
    @Timed
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        log.debug("REST request to delete Payment : {}", id);
        paymentService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
