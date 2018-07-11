package com.landexp.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.landexp.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.landexp.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.landexp.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.landexp.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.landexp.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.landexp.domain.Region.class.getName(), jcacheConfiguration);
            cm.createCache(com.landexp.domain.Region.class.getName() + ".districts", jcacheConfiguration);
            cm.createCache(com.landexp.domain.Region.class.getName() + ".users", jcacheConfiguration);
            cm.createCache(com.landexp.domain.City.class.getName(), jcacheConfiguration);
            cm.createCache(com.landexp.domain.City.class.getName() + ".districts", jcacheConfiguration);
            cm.createCache(com.landexp.domain.District.class.getName(), jcacheConfiguration);
            cm.createCache(com.landexp.domain.District.class.getName() + ".wards", jcacheConfiguration);
            cm.createCache(com.landexp.domain.Ward.class.getName(), jcacheConfiguration);
            cm.createCache(com.landexp.domain.House.class.getName(), jcacheConfiguration);
            cm.createCache(com.landexp.domain.House.class.getName() + ".photos", jcacheConfiguration);
            cm.createCache(com.landexp.domain.ServiceFee.class.getName(), jcacheConfiguration);
            cm.createCache(com.landexp.domain.HousePhoto.class.getName(), jcacheConfiguration);
            cm.createCache(com.landexp.domain.LandProject.class.getName(), jcacheConfiguration);
            cm.createCache(com.landexp.domain.LandProject.class.getName() + ".photos", jcacheConfiguration);
            cm.createCache(com.landexp.domain.LandProjectPhoto.class.getName(), jcacheConfiguration);
            cm.createCache(com.landexp.domain.Article.class.getName(), jcacheConfiguration);
            cm.createCache(com.landexp.domain.Category.class.getName(), jcacheConfiguration);
            cm.createCache(com.landexp.domain.UserSubscription.class.getName(), jcacheConfiguration);
            cm.createCache(com.landexp.domain.UserTracking.class.getName(), jcacheConfiguration);
            cm.createCache(com.landexp.domain.UserFeed.class.getName(), jcacheConfiguration);
            cm.createCache(com.landexp.domain.SearchTracking.class.getName(), jcacheConfiguration);
            cm.createCache(com.landexp.domain.UserFinancial.class.getName(), jcacheConfiguration);
            cm.createCache(com.landexp.domain.PotentialCustomer.class.getName(), jcacheConfiguration);
            cm.createCache(com.landexp.domain.Payment.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
