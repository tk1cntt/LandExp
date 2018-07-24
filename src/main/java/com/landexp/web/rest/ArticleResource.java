package com.landexp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.landexp.config.Utils;
import com.landexp.domain.Category;
import com.landexp.domain.Category_;
import com.landexp.frontend.responses.MappingUtils;
import com.landexp.repository.CategoryRepository;
import com.landexp.security.AuthoritiesConstants;
import com.landexp.service.ArticleService;
import com.landexp.service.dto.ArticleDTO;
import com.landexp.service.dto.ArticleDetailDTO;
import com.landexp.service.dto.ArticleMapDTO;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Article.
 */
@RestController
@RequestMapping("/api")
public class ArticleResource {

    private static final String ENTITY_NAME = "article";
    private final Logger log = LoggerFactory.getLogger(ArticleResource.class);
    private final ArticleService articleService;
    private final CategoryRepository categoryRepository;

    public ArticleResource(ArticleService articleService, CategoryRepository categoryRepository) {
        this.articleService = articleService;
        this.categoryRepository = categoryRepository;
    }

    /**
     * POST  /articles : Create a new article.
     *
     * @param articleDTO the articleDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new articleDTO, or with status 400 (Bad Request) if the article has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/articles")
    @Timed
    @Secured(AuthoritiesConstants.STAFF)
    public ResponseEntity<ArticleDetailDTO> createArticle(@RequestBody ArticleDetailDTO articleDTO) throws URISyntaxException {
        log.debug("REST request to save Article : {}", articleDTO);
        if (articleDTO.getId() != null) {
            throw new BadRequestAlertException("A new article cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ArticleDetailDTO result = articleService.save(articleDTO);
        return ResponseEntity.created(new URI("/api/articles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /articles : Updates an existing article.
     *
     * @param articleDTO the articleDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated articleDTO,
     * or with status 400 (Bad Request) if the articleDTO is not valid,
     * or with status 500 (Internal Server Error) if the articleDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/articles")
    @Timed
    @Secured(AuthoritiesConstants.STAFF)
    public ResponseEntity<ArticleDetailDTO> updateArticle(@RequestBody ArticleDetailDTO articleDTO) throws URISyntaxException {
        log.debug("REST request to update Article : {}", articleDTO);
        if (articleDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ArticleDetailDTO result = articleService.save(articleDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, articleDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /articles : get all the articles.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of articles in body
     */
    @GetMapping("/articles")
    @Timed
    public ResponseEntity<List<ArticleDTO>> getAllArticles(Pageable pageable) {
        log.debug("REST request to get a page of Articles");
        Page<ArticleDTO> page = articleService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/articles");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /articles : get all the articles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of articles in body
     */
    @GetMapping("/articles/top")
    @Timed
    public List<ArticleDTO> getTop() {
        log.debug("REST request to get a page of Articles");
        return articleService.findTop();
    }

    /**
     * GET  /articles : get all the articles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of articles in body
     */
    @GetMapping("/articles/all")
    @Timed
    public List<ArticleMapDTO> getAllTop() {
        log.debug("REST request to get a page of Articles");
        List<ArticleMapDTO> maps = new ArrayList<>();
        List<Category> categories = categoryRepository.findByEnabledOrderByIndexAsc(true);
        for(Category category_: categories) {
            ArticleMapDTO map = new ArticleMapDTO();
            List<ArticleDTO> articles = articleService.findTopBy(category_.getId());
            map.setKey(category_.getName());
            map.setValue(articles);
            maps.add(map);
        }
        return maps;
    }

    /**
     * GET  /articles : get all the articles.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of articles in body
     */
    @GetMapping("/articles/{id}/top")
    @Timed
    public List<ArticleDTO> getTopByCategory(@PathVariable Long id) {
        log.debug("REST request to get a page of Articles");
        return articleService.findTopBy(id);
    }

    /**
     * GET  /articles : get all the articles.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of articles in body
     */
    @GetMapping("/articles/{id}/all")
    @Timed
    public ResponseEntity<List<ArticleDTO>> getByArticles(@PathVariable Long id, Pageable pageable) {
        log.debug("REST request to get a page of Articles");
        Page<ArticleDTO> page = articleService.findBy(id, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/articles/" + id + "/all");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /articles/:id : get the "id" article.
     *
     * @param id the id of the articleDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the articleDTO, or with status 404 (Not Found)
     */
    @GetMapping("/articles/{id}")
    @Timed
    public ResponseEntity<ArticleDetailDTO> getArticle(@PathVariable Long id) {
        log.debug("REST request to get Article : {}", id);
        Optional<ArticleDetailDTO> articleDTO = articleService.findOne(id);
        return ResponseUtil.wrapOrNotFound(articleDTO);
    }

    /**
     * GET  /house-photos/{id}/contents : get photo in byte array.
     */
    @GetMapping("/articles/{id}/avatar/{link}")
    @Timed
    @ResponseBody
    public byte[] getHousePhotoById(@PathVariable String id, @PathVariable String link) throws IOException {
        log.debug("REST request to get a image data in byte array");
        ArticleDetailDTO articleDTO = articleService.findOne(Utils.decodeId(id)).get();
        ByteArrayOutputStream bao = new ByteArrayOutputStream();
        Thumbnails.of(MappingUtils.createImageFromBytes(articleDTO.getAvatar()))
            .size(538, 376)
            .outputFormat("jpg")
            .toOutputStream(bao);
        return bao.toByteArray();
    }

    /**
     * DELETE  /articles/:id : delete the "id" article.
     *
     * @param id the id of the articleDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/articles/{id}")
    @Timed
    @Secured(AuthoritiesConstants.STAFF)
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        log.debug("REST request to delete Article : {}", id);
        articleService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
