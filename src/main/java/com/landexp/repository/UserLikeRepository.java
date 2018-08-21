package com.landexp.repository;

import com.landexp.domain.UserLike;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the UserLike entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserLikeRepository extends JpaRepository<UserLike, Long> {

    @Query("select user_like from UserLike user_like where user_like.user.login = ?#{principal.username}")
    List<UserLike> findByUserIsCurrentUser();

}
