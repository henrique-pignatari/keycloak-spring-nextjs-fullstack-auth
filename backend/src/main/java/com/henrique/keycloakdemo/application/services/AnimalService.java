package com.henrique.keycloakdemo.application.services;

import com.henrique.keycloakdemo.application.dtos.animal.AnimalCreateRequestDTO;
import com.henrique.keycloakdemo.application.dtos.animal.AnimalResponseDTO;

import java.util.UUID;

public interface AnimalService{
    AnimalResponseDTO create(AnimalCreateRequestDTO requestDTO);
    AnimalResponseDTO getById(UUID id);
}
