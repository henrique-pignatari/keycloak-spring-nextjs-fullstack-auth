package com.henrique.keycloakdemo.api.controllers;

import com.henrique.keycloakdemo.application.dtos.contact.ContactCreateDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/contact")
public class ContactController {

    @PostMapping
    public ResponseEntity<String> create(@RequestBody ContactCreateDTO dto){
        return ResponseEntity.ok("Message created with: " + dto.message());
    }
}
