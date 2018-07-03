package com.landexp.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties specific to Landexp.
 * <p>
 * Properties are configured in the application.yml file.
 * See {@link io.github.jhipster.config.JHipsterProperties} for a good example.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {

    private final ApplicationProperties.Paging paging = new ApplicationProperties.Paging();
    private final ApplicationProperties.Api api = new ApplicationProperties.Api();

    public ApplicationProperties.Paging getPaging() {
        return this.paging;
    }

    public ApplicationProperties.Api getApi() {
        return this.api;
    }

    public static class Paging {
        private int size = 8;

        public Paging() {
        }

        public int getSize() {
            return size;
        }

        public void setSize(int size) {
            this.size = size;
        }
    }

    public static class Api {
        private String key;

        public Api() {
        }

        public String getKey() {
            return key;
        }

        public void setKey(String key) {
            this.key = key;
        }
    }
}
