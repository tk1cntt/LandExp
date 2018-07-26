package com.landexp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.landexp.config.Utils;
import com.landexp.frontend.responses.MappingUtils;
import com.landexp.responses.HousePhotoResponse;
import com.landexp.security.AuthoritiesConstants;
import com.landexp.service.HousePhotoService;
import com.landexp.service.dto.HousePhotoDTO;
import com.landexp.web.rest.errors.BadRequestAlertException;
import com.landexp.web.rest.util.HeaderUtil;
import com.landexp.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import net.coobird.thumbnailator.Thumbnails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing HousePhoto.
 */
@RestController
@RequestMapping("/api")
public class HousePhotoResource {

    private static final String ENTITY_NAME = "housePhoto";
    private final Logger log = LoggerFactory.getLogger(HousePhotoResource.class);
    private final HousePhotoService housePhotoService;

    public HousePhotoResource(HousePhotoService housePhotoService) {
        this.housePhotoService = housePhotoService;
    }

    public byte[] convert(ByteArrayOutputStream out) {
        return out.toByteArray();
    }

    /**
     * POST  /house-photos : Create a new housePhoto.
     *
     * @param housePhotoDTO the housePhotoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new housePhotoDTO, or with status 400 (Bad Request) if the housePhoto has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/house-photos")
    @Timed
    @Secured(AuthoritiesConstants.USER)
    public ResponseEntity<HousePhotoDTO> createHousePhoto(@RequestBody HousePhotoDTO housePhotoDTO) throws URISyntaxException {
        log.debug("REST request to save HousePhoto : {}", housePhotoDTO);
        if (housePhotoDTO.getId() != null) {
            throw new BadRequestAlertException("A new housePhoto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HousePhotoDTO result = housePhotoService.save(housePhotoDTO);
        return ResponseEntity.created(new URI("/api/house-photos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /house-photos : Updates an existing housePhoto.
     *
     * @param housePhotoDTO the housePhotoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated housePhotoDTO,
     * or with status 400 (Bad Request) if the housePhotoDTO is not valid,
     * or with status 500 (Internal Server Error) if the housePhotoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/house-photos")
    @Timed
    @Secured(AuthoritiesConstants.USER)
    public ResponseEntity<HousePhotoDTO> updateHousePhoto(@RequestBody HousePhotoDTO housePhotoDTO) throws URISyntaxException {
        log.debug("REST request to update HousePhoto : {}", housePhotoDTO);
        if (housePhotoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HousePhotoDTO result = housePhotoService.save(housePhotoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, housePhotoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /house-photos : get all the housePhotos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of housePhotos in body
     */
    @GetMapping("/house-photos")
    @Timed
    @Secured(AuthoritiesConstants.USER)
    public ResponseEntity<List<HousePhotoDTO>> getAllHousePhotos(Pageable pageable) {
        log.debug("REST request to get a page of HousePhotos");
        Page<HousePhotoDTO> page = housePhotoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/house-photos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /house-photos/{id}/contents : get photo in byte array.
     */
    @GetMapping("/house-photos/{id}/contents/{link}")
    @Timed
    @ResponseBody
    public byte[] getHousePhotoById(@PathVariable String id, @PathVariable String link) throws IOException {
        log.debug("REST request to get a image data in byte array");
        HousePhotoDTO dto = housePhotoService.findOne(Utils.decodeId(id)).get();
        ByteArrayOutputStream bao = new ByteArrayOutputStream();
        Thumbnails.of(MappingUtils.createImageFromBytes(dto.getImage()))
            .size(538, 376)
            .outputFormat("jpg")
            .toOutputStream(bao);
        return bao.toByteArray();
    }

    /**
     * GET  /house-photos/{id}/thumbnails : get photo in byte array.
     */
    @GetMapping("/house-photos/{id}/thumbnails/{link}")
    @Timed
    @ResponseBody
    public byte[] getPhotoThumbnail(@PathVariable String id, @PathVariable String link) throws IOException {
        log.debug("REST request to get a image data in byte array");
        HousePhotoDTO dto = housePhotoService.findOne(Utils.decodeId(id)).get();
        ByteArrayOutputStream bao = new ByteArrayOutputStream();
        Thumbnails.of(MappingUtils.createImageFromBytes(dto.getImage()))
            .size(92, 67)
            .outputFormat("jpg")
            .toOutputStream(bao);
        return bao.toByteArray();
    }

    /**
     * GET  /house-photos/:id : get the "id" housePhoto.
     *
     * @param id the id of the housePhotoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the housePhotoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/house-photos/{id}")
    @Timed
    @Secured(AuthoritiesConstants.USER)
    public ResponseEntity<HousePhotoDTO> getHousePhoto(@PathVariable Long id) {
        log.debug("REST request to get HousePhoto : {}", id);
        Optional<HousePhotoDTO> housePhotoDTO = housePhotoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(housePhotoDTO);
    }

    /**
     * GET  /house-photos/:id/houses : get the photo of house.
     *
     * @param id the id of the HousePhotoResponse to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the housePhotoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/house-photos/{id}/houses")
    @Timed
    public ResponseEntity<List<HousePhotoResponse>> getPhotoOfHouse(@PathVariable Long id, Pageable pageable) {
        log.debug("REST request to get photo of house : {}", id);
        Page<HousePhotoResponse> page = housePhotoService.findByHouse(id, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/house-photos/" + id + "/houses");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * DELETE  /house-photos/:id : delete the "id" housePhoto.
     *
     * @param id the id of the housePhotoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/house-photos/{id}")
    @Timed
    @Secured(AuthoritiesConstants.USER)
    public ResponseEntity<Void> deleteHousePhoto(@PathVariable Long id) {
        log.debug("REST request to delete HousePhoto : {}", id);
        housePhotoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
