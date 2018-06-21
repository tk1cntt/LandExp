package com.landexp.repository.search;

import com.landexp.domain.Ward;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Ward entity.
 */
public interface WardSearchRepository extends ElasticsearchRepository<Ward, Long> {
}
