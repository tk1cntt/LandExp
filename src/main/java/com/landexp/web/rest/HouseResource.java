package com.landexp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.maps.model.PlaceType;
import com.landexp.config.Utils;
import com.landexp.domain.enumeration.PaymentStatusType;
import com.landexp.domain.enumeration.StatusType;
import com.landexp.frontend.responses.MappingUtils;
import com.landexp.security.AuthoritiesConstants;
import com.landexp.security.SecurityUtils;
import com.landexp.service.*;
import com.landexp.service.dto.*;
import com.landexp.web.rest.errors.BadRequestAlertException;
import com.landexp.web.rest.responses.GooglePlaceResponse;
import com.landexp.web.rest.util.HeaderUtil;
import com.landexp.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;
import org.apache.commons.io.FileUtils;
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

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.*;

/**
 * REST controller for managing House.
 */
@RestController
@RequestMapping("/api")
public class HouseResource {

    private static final String ENTITY_NAME = "house";
    private final Logger log = LoggerFactory.getLogger(HouseResource.class);
    private final HouseService houseService;

    private final HouseQueryService houseQueryService;

    private final PaymentService paymentService;

    private final ServiceFeeService serviceFeeService;

    private final GoogleService googleService;

    public HouseResource(HouseService houseService,
                         HouseQueryService houseQueryService,
                         PaymentService paymentService,
                         ServiceFeeService serviceFeeService,
                         GoogleService googleService) {
        this.houseService = houseService;
        this.houseQueryService = houseQueryService;
        this.paymentService = paymentService;
        this.serviceFeeService = serviceFeeService;
        this.googleService = googleService;
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
    public ResponseEntity<HouseDetailDTO> initHouse() throws URISyntaxException {
        log.debug("REST request to init House");
        String username = SecurityUtils.getCurrentUserLogin().get();
        HouseDetailDTO houseDTO = houseService.initHouse(username);
        if (ObjectUtils.isEmpty(houseDTO)) {
            houseDTO = new HouseDetailDTO();
            houseDTO.setStatusType(StatusType.OPEN);
            log.debug("Save init House {}", houseDTO);
            houseDTO = houseService.saveByUsername(houseDTO, username);
            PaymentDTO paymentDTO = new PaymentDTO();
            paymentDTO.setHouseId(houseDTO.getId());
            paymentDTO.setCode(Utils.encodePayment(houseDTO.getId()).toUpperCase());
            paymentDTO.setCreateAt(LocalDate.now());
            paymentDTO.setPaymentStatus(PaymentStatusType.OPEN);
            paymentService.saveByUsername(paymentDTO, username);
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
    public ResponseEntity<HouseDetailDTO> createHouse(@RequestBody HouseDetailDTO houseDTO) throws URISyntaxException {
        log.debug("REST request to save House : {}", houseDTO);
        if (houseDTO.getId() != null) {
            throw new BadRequestAlertException("A new house cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HouseDetailDTO result = houseService.save(houseDTO);
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
    public ResponseEntity<HouseDetailDTO> updateHouse(@RequestBody HouseDetailDTO houseDTO) throws URISyntaxException {
        log.debug("REST request to update House : {}", houseDTO);
        if (houseDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HouseDetailDTO currentDTO = houseService.findOne(houseDTO.getId()).get();
        if (ObjectUtils.isEmpty(currentDTO)) {
            throw new BadRequestAlertException("Not Found " + houseDTO.getId(), ENTITY_NAME, "notfound");
        }
        String username = SecurityUtils.getCurrentUserLogin().get();
        if (!username.equalsIgnoreCase(currentDTO.getCreateByLogin())
            && !SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.STAFF)) {
            throw new BadRequestAlertException("No permission", ENTITY_NAME, "nopermission");
        }
        if (currentDTO.getStatusType().equals(StatusType.OPEN)) {
            houseDTO.setStatusType(StatusType.PENDING);
            ServiceFeeDTO serviceFee = serviceFeeService.findBySaleType(houseDTO.getSaleType()).get();
            if (!ObjectUtils.isEmpty(serviceFee)) {
                PaymentDTO paymentDTO = paymentService.findByHouse(houseDTO.getId()).get();
                if (!ObjectUtils.isEmpty(paymentDTO) && paymentDTO.getPaymentStatus() != PaymentStatusType.PAID) {
                    paymentDTO.setPaymentStatus(PaymentStatusType.PENDING);
                    paymentDTO.setMoney(serviceFee.getFee());
                    paymentService.updateByUsername(paymentDTO, username);
                }
            }
        } else {
            houseDTO.setStatusType(currentDTO.getStatusType());
        }
        houseDTO.setUpdateAt(LocalDate.now());
        HouseDetailDTO result = houseService.updateByUsername(houseDTO, username);
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
    public ResponseEntity<List<HouseDTO>> getPublicHouses(HouseCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Houses by criteria: {}", criteria);
        HouseCriteria.StatusTypeFilter filter = new HouseCriteria.StatusTypeFilter();
        List<StatusType> statusTypes = new ArrayList<>();
        // statusTypes.add(StatusType.PENDING);
        statusTypes.add(StatusType.PAID);
        filter.setIn(statusTypes);
        criteria.setStatusType(filter);
        Page<HouseDTO> page = houseQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/houses");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /houses : get all the houses.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of houses in body
     */
    @GetMapping("/houses/items")
    @Timed
    @Secured(AuthoritiesConstants.STAFF)
    public ResponseEntity<List<HouseDTO>> getItemHouses(HouseCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Houses by criteria: {}", criteria);
        HouseCriteria.StatusTypeFilter filter = new HouseCriteria.StatusTypeFilter();
        List<StatusType> statusTypes = new ArrayList<>();
        statusTypes.add(StatusType.PENDING);
        statusTypes.add(StatusType.CANCELED);
        statusTypes.add(StatusType.PAID);
        filter.setIn(statusTypes);
        criteria.setStatusType(filter);
        Page<HouseDTO> page = houseQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/houses");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /houses/top : get top the houses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of houses in body
     */
    @GetMapping("/houses/top")
    @Timed
    public List<HouseDTO> getTopHouses() {
        log.debug("REST request to get top Houses");
        return houseService.findTop();
    }

    /**
     * GET  /houses/users : get all the house of staff
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of houses in body
     */
    @GetMapping("/houses/staffs")
    @Timed
    @Secured(AuthoritiesConstants.USER)
    public ResponseEntity<List<HouseDTO>> getAllHouseOfStaff(Pageable pageable) {
        log.debug("REST request to get House of staff");
        Page<HouseDTO> page;
        String username = SecurityUtils.getCurrentUserLogin().get();
        if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.MANAGER)) {
            page = houseService.findAll(pageable);
        } else if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.STAFF)) {
            page = houseService.findByStaff(username, pageable);
        } else {
            page = houseService.findByOwner(username, pageable);
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
    @Secured(AuthoritiesConstants.USER)
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
    public ResponseEntity<HouseDetailDTO> getHouse(@PathVariable Long id) throws IOException {
        log.debug("REST request to get House : {}", id);
        Optional<HouseDetailDTO> houseDTO = houseService.findOne(id);
        if (ObjectUtils.isEmpty(houseDTO.get())) {
            throw new BadRequestAlertException("Not Found " + id, ENTITY_NAME, "notfound");
        }
        if (!houseDTO.get().getStatusType().equals(StatusType.PAID)
            && !SecurityUtils.getCurrentUserLogin().get().equalsIgnoreCase(houseDTO.get().getCreateByLogin())
            && !SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.MANAGER)
            && !SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.STAFF)) {
            throw new BadRequestAlertException("No permission", ENTITY_NAME, "nopermission");
        }
        HouseDetailDTO dto = houseDTO.get();
        if (!StringUtils.isEmpty(dto.getGoogleId())) {
            dto.setRestaurants(googleService.getPlaces(dto.getGoogleId(), "supermarket", dto.getLatitude(), dto.getLongitude(), 1000));
            dto.setSchools(googleService.getPlaces(dto.getGoogleId(), "school", dto.getLatitude(), dto.getLongitude(), 1000));
            dto.setHospitals(googleService.getPlaces(dto.getGoogleId(), "hospital", dto.getLatitude(), dto.getLongitude(), 1000));
        }
        return ResponseUtil.wrapOrNotFound(Optional.of(dto));
    }



    /**
     * GET  /house-photos/{id}/contents : get photo in byte array.
     */
    @GetMapping("/houses/{id}/avatar/{link}")
    @Timed
    @ResponseBody
    public byte[] getHousePhotoById(@PathVariable String id, @PathVariable String link) throws IOException {
        log.debug("REST request to get a image data in byte array");
        HouseDetailDTO dto = houseService.findOne(Utils.decodeId(id)).get();
        ByteArrayOutputStream bao = new ByteArrayOutputStream();
        Thumbnails.of(MappingUtils.createImageFromBytes(dto.getAvatar()))
            .size(538, 376)
            .crop(Positions.CENTER)
            .outputFormat("jpg")
            .toOutputStream(bao);
        return bao.toByteArray();
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
        Optional<HouseDetailDTO> houseDTO = houseService.findOne(id);
        if (ObjectUtils.isEmpty(houseDTO.get())) {
            throw new BadRequestAlertException("Not Found " + id, ENTITY_NAME, "notfound");
        }
        if (!SecurityUtils.getCurrentUserLogin().get().equalsIgnoreCase(houseDTO.get().getCreateByLogin())
            && !SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.MANAGER)) {
            throw new BadRequestAlertException("No permission", ENTITY_NAME, "nopermission");
        }
        HouseDetailDTO dto = houseDTO.get();
        dto.setStatusType(StatusType.CANCELED);
        houseService.save(dto);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
