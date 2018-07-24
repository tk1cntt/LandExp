package com.landexp.service;

import com.landexp.domain.Article;
import com.landexp.domain.User;
import com.landexp.domain.enumeration.StatusType;
import com.landexp.repository.ArticleRepository;
import com.landexp.repository.UserRepository;
import com.landexp.service.dto.ArticleDTO;
import com.landexp.service.dto.ArticleDetailDTO;
import com.landexp.service.mapper.ArticleMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Article.
 */
@Service
@Transactional
public class ArticleService {

    private final Logger log = LoggerFactory.getLogger(ArticleService.class);

    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;

    private final ArticleMapper articleMapper;

    public ArticleService(ArticleRepository articleRepository, ArticleMapper articleMapper, UserRepository userRepository) {
        this.articleRepository = articleRepository;
        this.articleMapper = articleMapper;
        this.userRepository = userRepository;

    }

    /**
     * Save a article.
     *
     * @param articleDTO the entity to save
     * @return the persisted entity
     */
    public ArticleDetailDTO save(ArticleDetailDTO articleDTO) {
        log.debug("Request to save Article : {}", articleDTO);
        Article article = articleMapper.toEntity(articleDTO);
        article = articleRepository.save(article);
        return articleMapper.toDetailDto(article);
    }

    /**
     * Save a article.
     *
     * @param articleDTO the entity to save
     * @return the persisted entity
     */
    public ArticleDetailDTO saveByUsername(ArticleDetailDTO articleDTO, String username) {
        log.debug("Request to save Article : {}", articleDTO);
        Article article = articleMapper.toEntity(articleDTO);
        Optional<User> existingUser = userRepository.findOneByLogin(username);
        article.setCreateBy(existingUser.get());
        article.setUpdateBy(existingUser.get());
        article = articleRepository.save(article);
        return articleMapper.toDetailDto(article);
    }

    /**
     * Update a article.
     *
     * @param articleDTO the entity to save
     * @return the persisted entity
     */
    public ArticleDetailDTO updateByUsername(ArticleDetailDTO articleDTO, String username) {
        log.debug("Request to save Article : {}", articleDTO);
        Article article = articleMapper.toEntity(articleDTO);
        Optional<User> existingUser = userRepository.findOneByLogin(username);
        article.setUpdateBy(existingUser.get());
        article = articleRepository.save(article);
        return articleMapper.toDetailDto(article);
    }

    /**
     * Get all the articles.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ArticleDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Articles");
        return articleRepository.findAll(pageable)
            .map(articleMapper::toDto);
    }

    /**
     * Get top 5 the articles.
     *
     * @param id the category id
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ArticleDTO> findTop() {
        log.debug("Request to get all Articles");
        return articleRepository.findTop5ByStatusTypeOrderByCreateAtDesc(StatusType.PAID).stream()
            .map(articleMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get top 3 the articles.
     *
     * @param id the category id
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ArticleDTO> findTopBy(Long id) {
        log.debug("Request to get all Articles");
        return articleRepository.findTop3ByCategoryIdAndStatusTypeOrderByCreateAtDesc(id, StatusType.PAID).stream()
            .map(articleMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the articles.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ArticleDTO> findBy(Long id, Pageable pageable) {
        log.debug("Request to get by Articles");
        return articleRepository.findByCategoryIdAndStatusTypeOrderByCreateAtDesc(id, StatusType.PAID, pageable)
            .map(articleMapper::toDto);
    }

    /**
     * Get one article by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<ArticleDetailDTO> findOne(Long id) {
        log.debug("Request to get Article : {}", id);
        return articleRepository.findById(id)
            .map(articleMapper::toDetailDto);
    }

    /**
     * Delete the article by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Article : {}", id);
        articleRepository.deleteById(id);
    }
}
