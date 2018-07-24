package com.landexp.repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.landexp.LandexpApp;
import com.landexp.domain.Category;
import com.landexp.service.GoogleService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = LandexpApp.class)
public class ArticleRepositoryTest {
    ObjectMapper mapper = new ObjectMapper();

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ArticleRepository articleRepository;

    @Test
    public void testArticle() throws JsonProcessingException {
        List<Category> categoryList =
            categoryRepository.findByEnabledOrderByIndexAsc(true);
        System.out.println(mapper.writeValueAsString(categoryList));
    }
}
