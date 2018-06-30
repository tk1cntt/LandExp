package com.landexp.frontend;

import com.landexp.frontend.responses.HouseResponse;
import com.landexp.frontend.responses.MappingUtils;
import com.landexp.service.HouseService;
import com.landexp.service.dto.HouseDTO;
import com.landexp.web.rest.HouseResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;

@Controller
public class HomeController {

    private final Logger log = LoggerFactory.getLogger(HomeController.class);

    @Autowired
    private HouseService houseService;

    @RequestMapping(value={"/"}, method = RequestMethod.GET)
    public ModelAndView login(){
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("home");
        Page<HouseDTO> houses = houseService.findAll(new PageRequest(0, 20));
        List<HouseResponse> responses = new ArrayList<>();
        for(HouseDTO house: houses) {
            responses.add(MappingUtils.mappingHouse(house));
        }
        modelAndView.addObject("houses", responses);
        return modelAndView;
    }
}
