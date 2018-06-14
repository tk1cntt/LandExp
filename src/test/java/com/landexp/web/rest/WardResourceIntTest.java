package com.landexp.web.rest;

import com.landexp.LandexpApp;

import com.landexp.domain.Ward;
import com.landexp.repository.WardRepository;
import com.landexp.repository.search.WardSearchRepository;
import com.landexp.service.WardService;
import com.landexp.service.dto.WardDTO;
import com.landexp.service.mapper.WardMapper;
import com.landexp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;


import static com.landexp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the WardResource REST controller.
 *
 * @see WardResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LandexpApp.class)
public class WardResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ENABLED = false;
    private static final Boolean UPDATED_ENABLED = true;

    private static final LocalDate DEFAULT_CREATE_AT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATE_AT = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_UPDATE_AT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_UPDATE_AT = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private WardRepository wardRepository;


    @Autowired
    private WardMapper wardMapper;
    

    @Autowired
    private WardService wardService;

    /**
     * This repository is mocked in the com.landexp.repository.search test package.
     *
     * @see com.landexp.repository.search.WardSearchRepositoryMockConfiguration
     */
    @Autowired
    private WardSearchRepository mockWardSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restWardMockMvc;

    private Ward ward;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WardResource wardResource = new WardResource(wardService);
        this.restWardMockMvc = MockMvcBuilders.standaloneSetup(wardResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ward createEntity(EntityManager em) {
        Ward ward = new Ward()
            .name(DEFAULT_NAME)
            .enabled(DEFAULT_ENABLED)
            .createAt(DEFAULT_CREATE_AT)
            .updateAt(DEFAULT_UPDATE_AT);
        return ward;
    }

    @Before
    public void initTest() {
        ward = createEntity(em);
    }

    @Test
    @Transactional
    public void createWard() throws Exception {
        int databaseSizeBeforeCreate = wardRepository.findAll().size();

        // Create the Ward
        WardDTO wardDTO = wardMapper.toDto(ward);
        restWardMockMvc.perform(post("/api/wards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wardDTO)))
            .andExpect(status().isCreated());

        // Validate the Ward in the database
        List<Ward> wardList = wardRepository.findAll();
        assertThat(wardList).hasSize(databaseSizeBeforeCreate + 1);
        Ward testWard = wardList.get(wardList.size() - 1);
        assertThat(testWard.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testWard.isEnabled()).isEqualTo(DEFAULT_ENABLED);
        assertThat(testWard.getCreateAt()).isEqualTo(DEFAULT_CREATE_AT);
        assertThat(testWard.getUpdateAt()).isEqualTo(DEFAULT_UPDATE_AT);

        // Validate the Ward in Elasticsearch
        verify(mockWardSearchRepository, times(1)).save(testWard);
    }

    @Test
    @Transactional
    public void createWardWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = wardRepository.findAll().size();

        // Create the Ward with an existing ID
        ward.setId(1L);
        WardDTO wardDTO = wardMapper.toDto(ward);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWardMockMvc.perform(post("/api/wards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wardDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Ward in the database
        List<Ward> wardList = wardRepository.findAll();
        assertThat(wardList).hasSize(databaseSizeBeforeCreate);

        // Validate the Ward in Elasticsearch
        verify(mockWardSearchRepository, times(0)).save(ward);
    }

    @Test
    @Transactional
    public void getAllWards() throws Exception {
        // Initialize the database
        wardRepository.saveAndFlush(ward);

        // Get all the wardList
        restWardMockMvc.perform(get("/api/wards?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ward.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].enabled").value(hasItem(DEFAULT_ENABLED.booleanValue())))
            .andExpect(jsonPath("$.[*].createAt").value(hasItem(DEFAULT_CREATE_AT.toString())))
            .andExpect(jsonPath("$.[*].updateAt").value(hasItem(DEFAULT_UPDATE_AT.toString())));
    }
    

    @Test
    @Transactional
    public void getWard() throws Exception {
        // Initialize the database
        wardRepository.saveAndFlush(ward);

        // Get the ward
        restWardMockMvc.perform(get("/api/wards/{id}", ward.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ward.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.enabled").value(DEFAULT_ENABLED.booleanValue()))
            .andExpect(jsonPath("$.createAt").value(DEFAULT_CREATE_AT.toString()))
            .andExpect(jsonPath("$.updateAt").value(DEFAULT_UPDATE_AT.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingWard() throws Exception {
        // Get the ward
        restWardMockMvc.perform(get("/api/wards/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWard() throws Exception {
        // Initialize the database
        wardRepository.saveAndFlush(ward);

        int databaseSizeBeforeUpdate = wardRepository.findAll().size();

        // Update the ward
        Ward updatedWard = wardRepository.findById(ward.getId()).get();
        // Disconnect from session so that the updates on updatedWard are not directly saved in db
        em.detach(updatedWard);
        updatedWard
            .name(UPDATED_NAME)
            .enabled(UPDATED_ENABLED)
            .createAt(UPDATED_CREATE_AT)
            .updateAt(UPDATED_UPDATE_AT);
        WardDTO wardDTO = wardMapper.toDto(updatedWard);

        restWardMockMvc.perform(put("/api/wards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wardDTO)))
            .andExpect(status().isOk());

        // Validate the Ward in the database
        List<Ward> wardList = wardRepository.findAll();
        assertThat(wardList).hasSize(databaseSizeBeforeUpdate);
        Ward testWard = wardList.get(wardList.size() - 1);
        assertThat(testWard.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testWard.isEnabled()).isEqualTo(UPDATED_ENABLED);
        assertThat(testWard.getCreateAt()).isEqualTo(UPDATED_CREATE_AT);
        assertThat(testWard.getUpdateAt()).isEqualTo(UPDATED_UPDATE_AT);

        // Validate the Ward in Elasticsearch
        verify(mockWardSearchRepository, times(1)).save(testWard);
    }

    @Test
    @Transactional
    public void updateNonExistingWard() throws Exception {
        int databaseSizeBeforeUpdate = wardRepository.findAll().size();

        // Create the Ward
        WardDTO wardDTO = wardMapper.toDto(ward);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restWardMockMvc.perform(put("/api/wards")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(wardDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Ward in the database
        List<Ward> wardList = wardRepository.findAll();
        assertThat(wardList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Ward in Elasticsearch
        verify(mockWardSearchRepository, times(0)).save(ward);
    }

    @Test
    @Transactional
    public void deleteWard() throws Exception {
        // Initialize the database
        wardRepository.saveAndFlush(ward);

        int databaseSizeBeforeDelete = wardRepository.findAll().size();

        // Get the ward
        restWardMockMvc.perform(delete("/api/wards/{id}", ward.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Ward> wardList = wardRepository.findAll();
        assertThat(wardList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Ward in Elasticsearch
        verify(mockWardSearchRepository, times(1)).deleteById(ward.getId());
    }

    @Test
    @Transactional
    public void searchWard() throws Exception {
        // Initialize the database
        wardRepository.saveAndFlush(ward);
        when(mockWardSearchRepository.search(queryStringQuery("id:" + ward.getId())))
            .thenReturn(Collections.singletonList(ward));
        // Search the ward
        restWardMockMvc.perform(get("/api/_search/wards?query=id:" + ward.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ward.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].enabled").value(hasItem(DEFAULT_ENABLED.booleanValue())))
            .andExpect(jsonPath("$.[*].createAt").value(hasItem(DEFAULT_CREATE_AT.toString())))
            .andExpect(jsonPath("$.[*].updateAt").value(hasItem(DEFAULT_UPDATE_AT.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ward.class);
        Ward ward1 = new Ward();
        ward1.setId(1L);
        Ward ward2 = new Ward();
        ward2.setId(ward1.getId());
        assertThat(ward1).isEqualTo(ward2);
        ward2.setId(2L);
        assertThat(ward1).isNotEqualTo(ward2);
        ward1.setId(null);
        assertThat(ward1).isNotEqualTo(ward2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(WardDTO.class);
        WardDTO wardDTO1 = new WardDTO();
        wardDTO1.setId(1L);
        WardDTO wardDTO2 = new WardDTO();
        assertThat(wardDTO1).isNotEqualTo(wardDTO2);
        wardDTO2.setId(wardDTO1.getId());
        assertThat(wardDTO1).isEqualTo(wardDTO2);
        wardDTO2.setId(2L);
        assertThat(wardDTO1).isNotEqualTo(wardDTO2);
        wardDTO1.setId(null);
        assertThat(wardDTO1).isNotEqualTo(wardDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(wardMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(wardMapper.fromId(null)).isNull();
    }
}
