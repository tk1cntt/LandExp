package com.landexp.repository;

import com.landexp.domain.HousePhoto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the HousePhoto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HousePhotoRepository extends JpaRepository<HousePhoto, Long> {

    @Query("select house_photo from HousePhoto house_photo where house_photo.createBy.login = ?#{principal.username}")
    List<HousePhoto> findByCreateByIsCurrentUser();

    @Query("select house_photo from HousePhoto house_photo where house_photo.updateBy.login = ?#{principal.username}")
    List<HousePhoto> findByUpdateByIsCurrentUser();

    Page<HousePhoto> findByHouseId(Long id, Pageable pageable);
}
