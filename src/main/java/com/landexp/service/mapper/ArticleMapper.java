package com.landexp.service.mapper;

import com.landexp.domain.*;
import com.landexp.frontend.responses.MappingUtils;
import com.landexp.service.dto.ArticleDTO;

import com.landexp.service.dto.ArticleDetailDTO;
import com.landexp.service.dto.HouseDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity Article and its DTO ArticleDTO.
 */
@Mapper(componentModel = "spring", uses = {CategoryMapper.class, UserMapper.class})
public interface ArticleMapper extends EntityMapper<ArticleDTO, Article> {

    @Mapping(source = "category.name", target = "categoryName")
    @Mapping(source = "createBy.login", target = "createByLogin")
    ArticleDTO toDto(Article article);

    @Mapping(source = "categoryId", target = "category")
    @Mapping(source = "createById", target = "createBy")
    @Mapping(source = "updateById", target = "updateBy")
    Article toEntity(ArticleDetailDTO articleDTO);

    @Mapping(source = "category.id", target = "categoryId")
    @Mapping(source = "category.name", target = "categoryName")
    @Mapping(source = "createBy.id", target = "createById")
    @Mapping(source = "createBy.login", target = "createByLogin")
    @Mapping(source = "updateBy.id", target = "updateById")
    @Mapping(source = "updateBy.login", target = "updateByLogin")
    ArticleDetailDTO toDetailDto(Article article);

    default Article fromId(Long id) {
        if (id == null) {
            return null;
        }
        Article article = new Article();
        article.setId(id);
        return article;
    }

    @AfterMapping
    default void addMores(@MappingTarget ArticleDetailDTO dto) {
        dto.setLink(MappingUtils.formatLink(dto));
    }

    @AfterMapping
    default void addMores(@MappingTarget ArticleDTO dto) {
        dto.setLink(MappingUtils.formatLink(dto));
    }

}
