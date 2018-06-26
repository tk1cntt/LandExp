package com.landexp.frontend;

import com.landexp.security.SecurityUtils;
import com.landexp.web.rest.HousePhotoResource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class UserController {
    private final Logger log = LoggerFactory.getLogger(UserController.class);


    @RequestMapping(value={"/trang-ca-nhan"}, method = RequestMethod.GET)
    public ModelAndView login(){
        log.debug("Current user {}", SecurityUtils.getCurrentUserLogin().get());
        SecurityContextHolder.getContext().getAuthentication().isAuthenticated();
        log.debug("Current getCredentials {}", SecurityContextHolder.getContext().getAuthentication().getCredentials());
        log.debug("Current getDetails {}", SecurityContextHolder.getContext().getAuthentication().getDetails());
        log.debug("Current isAuthenticated {}", SecurityContextHolder.getContext().getAuthentication().isAuthenticated());
        log.debug("Current getAuthorities {}", SecurityContextHolder.getContext().getAuthentication().getAuthorities());
        ModelAndView modelAndView = new ModelAndView();
        // modelAndView.addObject("principal", securityContext.getAuthentication().getPrincipal());
        modelAndView.setViewName("user");
        return modelAndView;
    }
}
