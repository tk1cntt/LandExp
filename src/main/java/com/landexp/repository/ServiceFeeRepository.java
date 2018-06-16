package com.landexp.repository;

import com.landexp.domain.ServiceFee;
import com.landexp.domain.enumeration.SaleType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the ServiceFee entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServiceFeeRepository extends JpaRepository<ServiceFee, Long> {

    Optional<ServiceFee> findFirstBySaleType(SaleType saleType);
}
