package com.landexp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.landexp.service.WardQueryService;
import com.landexp.service.WardService;
import com.landexp.service.dto.WardCriteria;
import com.landexp.service.dto.WardDTO;
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
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Ward.
 */
@RestController
@RequestMapping("/api")
public class WardResource {

    private static final String ENTITY_NAME = "ward";
    private final Logger log = LoggerFactory.getLogger(WardResource.class);
    private final WardService wardService;

    private final WardQueryService wardQueryService;

    public WardResource(WardService wardService, WardQueryService wardQueryService) {
        this.wardService = wardService;
        this.wardQueryService = wardQueryService;
    }

    /**
     * POST  /wards : Create a new ward.
     *
     * @param wardDTO the wardDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new wardDTO, or with status 400 (Bad Request) if the ward has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/wards")
    @Timed
    public ResponseEntity<WardDTO> createWard(@RequestBody WardDTO wardDTO) throws URISyntaxException {
        log.debug("REST request to save Ward : {}", wardDTO);
        if (wardDTO.getId() != null) {
            throw new BadRequestAlertException("A new ward cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WardDTO result = wardService.save(wardDTO);
        return ResponseEntity.created(new URI("/api/wards/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /wards : Updates an existing ward.
     *
     * @param wardDTO the wardDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated wardDTO,
     * or with status 400 (Bad Request) if the wardDTO is not valid,
     * or with status 500 (Internal Server Error) if the wardDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/wards")
    @Timed
    public ResponseEntity<WardDTO> updateWard(@RequestBody WardDTO wardDTO) throws URISyntaxException {
        log.debug("REST request to update Ward : {}", wardDTO);
        if (wardDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        WardDTO result = wardService.save(wardDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, wardDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /wards : get all the wards.
     *
     * @param pageable the pagination information
     * @param criteria the criterias which the requested entities should match
     * @return the ResponseEntity with status 200 (OK) and the list of wards in body
     */
    @GetMapping("/wards")
    @Timed
    public ResponseEntity<List<WardDTO>> getAllWards(WardCriteria criteria, Pageable pageable) {
        log.debug("REST request to get Wards by criteria: {}", criteria);
        Page<WardDTO> page = wardQueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/wards");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /wards/:id : get the "id" ward.
     *
     * @param id the id of the wardDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the wardDTO, or with status 404 (Not Found)
     */
    @GetMapping("/wards/{id}")
    @Timed
    public ResponseEntity<WardDTO> getWard(@PathVariable Long id) {
        log.debug("REST request to get Ward : {}", id);
        Optional<WardDTO> wardDTO = wardService.findOne(id);
        return ResponseUtil.wrapOrNotFound(wardDTO);
    }

    /**
     * DELETE  /wards/:id : delete the "id" ward.
     *
     * @param id the id of the wardDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/wards/{id}")
    @Timed
    public ResponseEntity<Void> deleteWard(@PathVariable Long id) {
        log.debug("REST request to delete Ward : {}", id);
        wardService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
