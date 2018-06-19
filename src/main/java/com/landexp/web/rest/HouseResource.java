package com.landexp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.landexp.config.Utils;
import com.landexp.domain.enumeration.PaymentStatusType;
import com.landexp.domain.enumeration.StatusType;
import com.landexp.security.AuthoritiesConstants;
import com.landexp.security.SecurityUtils;
import com.landexp.service.HouseQueryService;
import com.landexp.service.HouseService;
import com.landexp.service.PaymentService;
import com.landexp.service.ServiceFeeService;
import com.landexp.service.dto.HouseCriteria;
import com.landexp.service.dto.HouseDTO;
import com.landexp.service.dto.PaymentDTO;
import com.landexp.service.dto.ServiceFeeDTO;
import com.landexp.web.rest.errors.BadRequestAlertException;
import com.landexp.web.rest.errors.ExecuteRuntimeException;
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
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing House.
 */
@RestController
@RequestMapping("/api")
public class HouseResource {

    private final Logger log = LoggerFactory.getLogger(HouseResource.class);

    private static final String ENTITY_NAME = "house";

    private final HouseService houseService;

    private final HouseQueryService houseQueryService;

    private final PaymentService paymentService;

    private final ServiceFeeService serviceFeeService;

    public HouseResource(HouseService houseService, HouseQueryService houseQueryService, PaymentService paymentService, ServiceFeeService serviceFeeService) {
        this.houseService = houseService;
        this.houseQueryService = houseQueryService;
        this.paymentService = paymentService;
        this.serviceFeeService = serviceFeeService;
    }

    /**
     * GET  /houses/init : Init a new house.
     *
     * @return the ResponseEntity with status 201 (Created) and with body the new houseDTO, or with status 400 (Bad Request) if the house has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @GetMapping("/houses/init")
    @Timed
    @Secured(AuthoritiesConstants.USER)
    public ResponseEntity<HouseDTO> initHouse() throws URISyntaxException {
        log.debug("REST request to init House");
        String username = SecurityUtils.getCurrentUserLogin().get();
        HouseDTO houseDTO = houseService.initHouse(username);
        if (ObjectUtils.isEmpty(houseDTO)) {
            houseDTO = new HouseDTO();
            houseDTO.setStatusType(StatusType.OPEN);
            log.debug("Save init House {}", houseDTO);
            houseDTO = houseService.saveByUsername(houseDTO, username);
            PaymentDTO paymentDTO = new PaymentDTO();
            paymentDTO.setHouseId(houseDTO.getId());
            paymentDTO.setCode(Utils.generatePaymentCode(houseDTO.getId()).toUpperCase());
            paymentDTO.setCreateAt(LocalDate.now());
            paymentDTO.setPaymentStatus(PaymentStatusType.PENDING);
            paymentDTO.setCustomerId(houseDTO.getCreateById());
            paymentDTO.setCustomerLogin(houseDTO.getCreateByLogin());
            paymentDTO.setCreateById(houseDTO.getCreateById());
            paymentDTO.setCreateByLogin(houseDTO.getCreateByLogin());
            paymentService.save(paymentDTO);
        }
        return ResponseUtil.wrapOrNotFound(Optional.of(houseDTO));
    }

    /**
     * POST  /houses : Create a new house.
     *
     * @param houseDTO the houseDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new houseDTO, or with status 400 (Bad Request) if the house has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/houses")
    @Timed
    @Secured(AuthoritiesConstants.USER)
    public ResponseEntity<HouseDTO> createHouse(@RequestBody HouseDTO houseDTO) throws URISyntaxException {
        log.debug("REST request to save House : {}", houseDTO);
        if (houseDTO.getId() != null) {
            throw new BadRequestAlertException("A new house cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HouseDTO result = houseService.save(houseDTO);
        return ResponseEntity.created(new URI("/api/houses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /houses : Updates an existing house.
     *
     * @param houseDTO the houseDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated houseDTO,
     * or with status 400 (Bad Request) if the houseDTO is not valid,
     * or with status 500 (Internal Server Error) if the houseDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/houses")
    @Timed
    @Secured(AuthoritiesConstants.USER)
    public ResponseEntity<HouseDTO> updateHouse(@RequestBody HouseDTO houseDTO) throws URISyntaxException {
        log.debug("REST request to update House : {}", houseDTO);
        if (houseDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HouseDTO currentDTO = houseService.findOne(houseDTO.getId()).get();
        if (ObjectUtils.isEmpty(currentDTO)) {
            throw new ExecuteRuntimeException("Invalid id");
        }
        String username = SecurityUtils.getCurrentUserLogin().get();
        if (!username.equalsIgnoreCase(currentDTO.getCreateByLogin())
            && !SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.STAFF)) {
            throw new ExecuteRuntimeException("No permission");
        }
        if (currentDTO.getStatusType().equals(StatusType.OPEN)) {
            houseDTO.setStatusType(StatusType.PENDING);
            ServiceFeeDTO serviceFee = serviceFeeService.findBySaleType(houseDTO.getSaleType()).get();
            if (!ObjectUtils.isEmpty(serviceFee)) {
                PaymentDTO paymentDTO = paymentService.findByHouse(houseDTO.getId()).get();
                if (!ObjectUtils.isEmpty(paymentDTO)) {
                    paymentDTO.setMoney(serviceFee.getFee());
                    paymentService.save(paymentDTO);
                }
            }
        } else {
            houseDTO.setStatusType(currentDTO.getStatusType());
        }
        houseDTO.setUpdateAt(LocalDate.now());
        HouseDTO result = houseService.updateByUsername(houseDTO, username);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, houseDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /houses : get all the houses.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of houses in body
     */
    @GetMapping("/houses")
    @Timed
    @Secured(AuthoritiesConstants.MANAGER)
    public ResponseEntity<List<HouseDTO>> getAllHouses(HouseCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Houses by criteria: {}", criteria);
        Page<HouseDTO> page = houseQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/houses");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /houses/users : get all the house of staff
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of houses in body
     */
    @GetMapping("/houses/users")
    @Timed
    @Secured(AuthoritiesConstants.STAFF)
    public ResponseEntity<List<HouseDTO>> getAllHouseOfStaff(
        @RequestParam(value = "status", required = false) String status,
        Pageable pageable) {
        log.debug("REST request to get House of staff");
        Page<HouseDTO> page;
        String username = SecurityUtils.getCurrentUserLogin().get();
        if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.MANAGER)) {
            page = houseService.findAll(pageable);
        } else {
            if (StringUtils.isEmpty(status)) {
                page = houseService.findByStaff(username, pageable);
            } else {
                page = houseService.findByStatusAndUser(StatusType.valueOf(status), username, pageable);
            }
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/houses/users");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /houses/users : get all the house of staff
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of houses in body
     */
    @GetMapping("/houses/owner")
    @Timed
    @Secured(AuthoritiesConstants.STAFF)
    public ResponseEntity<List<HouseDTO>> getAllHouseOwner(Pageable pageable) {
        log.debug("REST request to get House of owner");
        String username = SecurityUtils.getCurrentUserLogin().get();
        Page<HouseDTO> page = houseService.findByOwner(username, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/houses/owner");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /houses/:id : get the "id" house.
     *
     * @param id the id of the houseDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the houseDTO, or with status 404 (Not Found)
     */
    @GetMapping("/houses/{id}")
    @Timed
    public ResponseEntity<HouseDTO> getHouse(@PathVariable Long id) {
        log.debug("REST request to get House : {}", id);
        Optional<HouseDTO> houseDTO = houseService.findOne(id);
        if (ObjectUtils.isEmpty(houseDTO.get())) {
            throw new ExecuteRuntimeException("Invalid id");
        }
        if (houseDTO.get().getStatusType().equals(StatusType.PENDING)
            && (!SecurityUtils.getCurrentUserLogin().get().equalsIgnoreCase(houseDTO.get().getCreateByLogin()))
            || !SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.MANAGER)) {
            throw new ExecuteRuntimeException("No permission");
        }
        if (!houseDTO.get().getStatusType().equals(StatusType.PAID)
            && !SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.MANAGER)) {
            throw new ExecuteRuntimeException("No permission");
        }
        return ResponseUtil.wrapOrNotFound(houseDTO);
    }

    /**
     * DELETE  /houses/:id : delete the "id" house.
     *
     * @param id the id of the houseDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/houses/{id}")
    @Timed
    @Secured(AuthoritiesConstants.USER)
    public ResponseEntity<Void> deleteHouse(@PathVariable Long id) {
        log.debug("REST request to delete House : {}", id);
        Optional<HouseDTO> houseDTO = houseService.findOne(id);
        if (ObjectUtils.isEmpty(houseDTO.get())) {
            throw new ExecuteRuntimeException("Invalid id");
        }
        if (!SecurityUtils.getCurrentUserLogin().get().equalsIgnoreCase(houseDTO.get().getCreateByLogin())
            && !SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.MANAGER)) {
            throw new ExecuteRuntimeException("No permission");
        }
        houseService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/houses?query=:query : search for the house corresponding
     * to the query.
     *
     * @param query    the query of the house search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/houses")
    @Timed
    public ResponseEntity<List<HouseDTO>> searchHouses(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Houses for query {}", query);
        Page<HouseDTO> page = houseService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/houses");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
