package com.henrique.keycloakdemo.application.services.impl;

import com.henrique.keycloakdemo.application.dtos.animal.AnimalCreateRequestDTO;
import com.henrique.keycloakdemo.application.dtos.animal.AnimalResponseDTO;
import com.henrique.keycloakdemo.application.exceptions.ResourceNotFoundException;
import com.henrique.keycloakdemo.application.services.AnimalService;
import com.henrique.keycloakdemo.domain.entities.Animal;
import com.henrique.keycloakdemo.domain.repositories.AnimalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AnimalServiceImpl implements AnimalService {

    private final AnimalRepository animalRepository;
    @Override
    public AnimalResponseDTO create(AnimalCreateRequestDTO requestDTO) {
        Animal entity = new Animal(requestDTO.name());

        entity = animalRepository.save(entity);

        return new AnimalResponseDTO(entity.getId(), entity.getName());
    }

    @Override
    public AnimalResponseDTO getById(UUID id) {
        Animal entity = animalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Could not find animal with id: " + id));

        return new AnimalResponseDTO(entity.getId(), entity.getName());
    }
}
