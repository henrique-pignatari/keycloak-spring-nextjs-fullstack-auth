package com.henrique.keycloakdemo.application.dtos.animal;

import jakarta.validation.constraints.NotBlank;

public record AnimalCreateRequestDTO(
        @NotBlank(message = "name is required")
        String name
) {
}
