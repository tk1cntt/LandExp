package com.landexp.frontend;

import com.landexp.config.Utils;
import com.landexp.frontend.responses.HouseResponse;
import com.landexp.frontend.responses.MappingUtils;
import com.landexp.service.HouseService;
import com.landexp.service.dto.HouseDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;

@Controller
public class DetailController {

    private final Logger log = LoggerFactory.getLogger(HomeController.class);

    @Autowired
    private HouseService houseService;

    @RequestMapping(value={"/bat-dong-san/{id}/{name}"}, method = RequestMethod.GET)
    public ModelAndView index(@PathVariable("id") String id, @PathVariable("name") String name){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("detail");
        HouseDTO dto = houseService.findOne(Utils.decodeId(id)).get();
        modelAndView.addObject("house", MappingUtils.mappingHouse(dto));
        return modelAndView;
    }
}
