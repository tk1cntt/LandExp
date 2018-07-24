package com.landexp.repository;

import com.landexp.domain.Article;
import com.landexp.domain.House;
import com.landexp.domain.enumeration.StatusType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Article entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

    @Query("select article from Article article where article.createBy.login = ?#{principal.username}")
    List<Article> findByCreateByIsCurrentUser();

    @Query("select article from Article article where article.updateBy.login = ?#{principal.username}")
    List<Article> findByUpdateByIsCurrentUser();

    Page<Article> findByCategoryIdAndStatusTypeOrderByCreateAtDesc(Long id, StatusType statusType, Pageable pageable);

    List<Article> findTop4ByCategoryIdAndStatusTypeOrderByCreateAtDesc(Long id, StatusType statusType);

    List<Article> findTop5ByStatusTypeOrderByCreateAtDesc(StatusType statusType);

}
