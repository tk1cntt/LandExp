package com.landexp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.landexp.service.UserLikeService;
import com.landexp.web.rest.errors.BadRequestAlertException;
import com.landexp.web.rest.util.HeaderUtil;
import com.landexp.service.dto.UserLikeDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing UserLike.
 */
@RestController
@RequestMapping("/api")
public class UserLikeResource {

    private final Logger log = LoggerFactory.getLogger(UserLikeResource.class);

    private static final String ENTITY_NAME = "userLike";

    private final UserLikeService userLikeService;

    public UserLikeResource(UserLikeService userLikeService) {
        this.userLikeService = userLikeService;
    }

    /**
     * POST  /user-likes : Create a new userLike.
     *
     * @param userLikeDTO the userLikeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userLikeDTO, or with status 400 (Bad Request) if the userLike has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-likes")
    @Timed
    public ResponseEntity<UserLikeDTO> createUserLike(@RequestBody UserLikeDTO userLikeDTO) throws URISyntaxException {
        log.debug("REST request to save UserLike : {}", userLikeDTO);
        if (userLikeDTO.getId() != null) {
            throw new BadRequestAlertException("A new userLike cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserLikeDTO result = userLikeService.save(userLikeDTO);
        return ResponseEntity.created(new URI("/api/user-likes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-likes : Updates an existing userLike.
     *
     * @param userLikeDTO the userLikeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userLikeDTO,
     * or with status 400 (Bad Request) if the userLikeDTO is not valid,
     * or with status 500 (Internal Server Error) if the userLikeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-likes")
    @Timed
    public ResponseEntity<UserLikeDTO> updateUserLike(@RequestBody UserLikeDTO userLikeDTO) throws URISyntaxException {
        log.debug("REST request to update UserLike : {}", userLikeDTO);
        if (userLikeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserLikeDTO result = userLikeService.save(userLikeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userLikeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-likes : get all the userLikes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of userLikes in body
     */
    @GetMapping("/user-likes")
    @Timed
    public List<UserLikeDTO> getAllUserLikes() {
        log.debug("REST request to get all UserLikes");
        return userLikeService.findAll();
    }

    /**
     * GET  /user-likes/:id : get the "id" userLike.
     *
     * @param id the id of the userLikeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userLikeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/user-likes/{id}")
    @Timed
    public ResponseEntity<UserLikeDTO> getUserLike(@PathVariable Long id) {
        log.debug("REST request to get UserLike : {}", id);
        Optional<UserLikeDTO> userLikeDTO = userLikeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(userLikeDTO);
    }

    /**
     * DELETE  /user-likes/:id : delete the "id" userLike.
     *
     * @param id the id of the userLikeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-likes/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserLike(@PathVariable Long id) {
        log.debug("REST request to delete UserLike : {}", id);
        userLikeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
