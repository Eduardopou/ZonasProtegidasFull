package com.example.userapi.controller;

import com.example.userapi.dto.AnimalRequest;
import com.example.userapi.dto.AnimalResponse;
import com.example.userapi.model.AnimalModel;
import com.example.userapi.service.AnimalService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/animal")
public class AnimalController {

    @Autowired
    private AnimalService animalService;

    @Autowired
    private Validator validator;

    @Autowired
    private ObjectMapper objectMapper;

    /**
     * Devuelve la lista de todos los animales registrados.
     */
    @GetMapping("/get-animals")
    public ResponseEntity<List<AnimalResponse>> getAnimals() {
        return animalService.getAnimals();
    }

    /**
     * Agrega un nuevo animal al sistema. Recibe datos y una imagen.
     */
    @PostMapping("/add-animal")
    public ResponseEntity<?> addAnimal(
            @RequestParam("file") MultipartFile file,
            @RequestParam("animalData") String animalDataJson
    ) {
        try {
            AnimalRequest request = objectMapper.readValue(animalDataJson, AnimalRequest.class);
            Set<ConstraintViolation<AnimalRequest>> violations = validator.validate(request);
            if (!violations.isEmpty()) {
                List<String> errorMessages = violations.stream()
                        .map(ConstraintViolation::getMessage)
                        .collect(Collectors.toList());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessages);
            }
            AnimalModel newAnimal = animalService.createAnimal(request, file);
            AnimalResponse response = new AnimalResponse();
            response.setId(newAnimal.getId());
            response.setName(newAnimal.getName());
            response.setScientificName(newAnimal.getScientificName());
            response.setExtinction(newAnimal.isExtinction());
            response.setImage(newAnimal.getImage());
            if (newAnimal.getZonaProtegida() != null) {
                response.setZonaProtegidaNombre(newAnimal.getZonaProtegida().getNombre());
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    /**
     * Devuelve los animales asociados a una zona protegida específica.
     */
    @GetMapping("/getByZone/{zonaId}")
    public ResponseEntity<List<AnimalResponse>> getByZone(@PathVariable Long zonaId) {
        return animalService.getAllAnimalsByZonaProtegida(zonaId);
    }

    /**
     * Actualiza los datos de un animal existente. Permite actualizar la imagen y los datos.
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateAnimal(
            @PathVariable Long id,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam("animalData") String animalDataJson
    ) {
        try {
            AnimalRequest request = objectMapper.readValue(animalDataJson, AnimalRequest.class);
            Set<ConstraintViolation<AnimalRequest>> violations = validator.validate(request);
            if (!violations.isEmpty()) {
                List<String> errorMessages = violations.stream()
                        .map(ConstraintViolation::getMessage)
                        .collect(Collectors.toList());
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessages);
            }
            AnimalModel updatedAnimal = animalService.updateAnimal(id, request, file);
            AnimalResponse response = new AnimalResponse();
            response.setId(updatedAnimal.getId());
            response.setName(updatedAnimal.getName());
            response.setScientificName(updatedAnimal.getScientificName());
            response.setExtinction(updatedAnimal.isExtinction());
            response.setImage(updatedAnimal.getImage());
            if (updatedAnimal.getZonaProtegida() != null) {
                response.setZonaProtegidaNombre(updatedAnimal.getZonaProtegida().getNombre());
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}