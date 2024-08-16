package com.henrique.keycloakdemo.api.controllers;

import com.henrique.keycloakdemo.application.dtos.animal.AnimalCreateRequestDTO;
import com.henrique.keycloakdemo.application.dtos.animal.AnimalResponseDTO;
import com.henrique.keycloakdemo.application.services.AnimalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.UUID;

@RestController
@RequestMapping("/animals")
@RequiredArgsConstructor
public class AnimalController {

    private final AnimalService animalService;

    @GetMapping("/{id}")
    public ResponseEntity<AnimalResponseDTO> getById(@PathVariable UUID id){
        AnimalResponseDTO dto = animalService.getById(id);

        return ResponseEntity.ok(dto);
    }

    @PostMapping
    public ResponseEntity<AnimalResponseDTO> create(@RequestBody @Valid AnimalCreateRequestDTO requestDTO){
        AnimalResponseDTO responseDTO = animalService.create(requestDTO);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequestUri()
                .path("/{id}")
                .buildAndExpand(responseDTO.id())
                .toUri();

        return ResponseEntity.created(uri).body(responseDTO);
    }
}
