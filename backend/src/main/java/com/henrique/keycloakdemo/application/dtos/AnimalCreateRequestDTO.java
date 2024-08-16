package com.henrique.keycloakdemo.application.dtos;

import jakarta.validation.constraints.NotBlank;

public record AnimalCreateRequestDTO(
        @NotBlank(message = "name is required")
        String name
) {
}
