package com.henrique.keycloakdemo.application.services;

import com.henrique.keycloakdemo.application.dtos.AnimalCreateRequestDTO;
import com.henrique.keycloakdemo.application.dtos.AnimalResponseDTO;

import java.util.UUID;

public interface AnimalService{
    AnimalResponseDTO create(AnimalCreateRequestDTO requestDTO);
    AnimalResponseDTO getById(UUID id);
}
