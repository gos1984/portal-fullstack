package ru.gostinfo.portal.backend.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ru.gostinfo.portal.backend.entity.User;
import ru.gostinfo.portal.backend.service.UserService;

import java.nio.file.attribute.UserPrincipal;
import java.security.Principal;

@CrossOrigin
@RestController
public class UserController {

    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public UserDetails login(@RequestBody User user) {
        return userService.authenticate(user);
    }

    @GetMapping("/api/users/current")
    public User login(Principal principal) {
        return userService.findByUser(principal.getName());
    }
}
