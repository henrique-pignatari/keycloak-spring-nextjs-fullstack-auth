package com.henrique.keycloakdemo.api.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {
    @GetMapping("/public")
    public ResponseEntity<String> publicRoute(){
        return  ResponseEntity.ok("PUBLIC MESSAGE");
    }

    @GetMapping("/protected")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> protectedRoute(){
        return  ResponseEntity.ok("PROTECTED MESSAGE");
    }

    @GetMapping("/private")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<String> privateRoute(){
        return  ResponseEntity.ok("PRIVATE MESSAGE");
    }
}
