package com.example.userapi.service;

import com.example.userapi.dto.AnimalRequest;
import com.example.userapi.dto.AnimalResponse;
import com.example.userapi.model.AnimalModel;
import com.example.userapi.model.ZonaProtegidaModel;
import com.example.userapi.repository.AnimalRepository;
import com.example.userapi.repository.ZonaProtegidaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio para operaciones CRUD de animales.
 */
@Service
public class AnimalService {

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private ZonaProtegidaRepository zonaProtegidaRepository;

    @Autowired
    private FileStorageService fileStorageService;


    /**
     * Devuelve la lista de animales registrados.
     */
    public ResponseEntity<List<AnimalResponse>> getAnimals() {
        List<AnimalModel> animalsFromDb = animalRepository.findAll();

        List<AnimalResponse> responses = animalsFromDb.stream().map(animal -> {
            AnimalResponse res = new AnimalResponse();
            res.setId(animal.getId());
            res.setName(animal.getName());
            res.setScientificName(animal.getScientificName());
            res.setExtinction(animal.isExtinction());
            res.setImage(animal.getImage());
            if (animal.getZonaProtegida() != null) {
                res.setZonaProtegidaNombre(animal.getZonaProtegida().getNombre());
            }
            return res;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(responses);

    }

    /**
     * Crea un nuevo animal y guarda su imagen.
     */
    public AnimalModel createAnimal(AnimalRequest request, MultipartFile imageFile) {
        // El servicio nos devuelve la ruta donde se guardó, ej: "/uploads-static/imagen.png"
        String imagePath = fileStorageService.saveFile(imageFile);

        //Busca la Zona Protegida
        ZonaProtegidaModel zona = zonaProtegidaRepository.findById(request.getZonaProtegidaId())
                .orElseThrow(() -> new RuntimeException("Error: Zona Protegida no encontrada."));

        //Crea el nuevo AnimalModel
        AnimalModel animal = new AnimalModel();
        animal.setName(request.getName());
        animal.setScientificName(request.getScientificName());
        animal.setExtinction(request.isExtinction());

        //Asigna la RUTA de la imagen guardada
        animal.setImage(imagePath);

        animal.setZonaProtegida(zona);

        //Guarda la entidad Animal en la BD
        return animalRepository.save(animal);
    }


    public ResponseEntity<List<AnimalResponse>> getAllAnimalsByZonaProtegida(Long zonaId) {

        List<AnimalModel> animalesDB = animalRepository.findByZonaProtegida_Id(zonaId);

      List<AnimalResponse> animalResponses = animalesDB.stream().map(animalModel -> {
          AnimalResponse animalResponse = new AnimalResponse();
          animalResponse.setId(animalModel.getId());
          animalResponse.setName(animalModel.getName());
          animalResponse.setScientificName(animalModel.getScientificName());
          animalResponse.setExtinction(animalModel.isExtinction());
          animalResponse.setImage(animalModel.getImage());
          animalResponse.setZonaProtegidaNombre(animalModel.getZonaProtegida().getNombre());
          return animalResponse;

      }).collect(Collectors.toList());
      return ResponseEntity.ok(animalResponses);
    }

    // Actualizar animal
    public AnimalModel updateAnimal(Long id, AnimalRequest request, MultipartFile imageFile) {
        //Buscar el animal existente
        AnimalModel animal = animalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Animal no encontrado con ID: " + id));

        //Actualizar datos básicos
        animal.setName(request.getName());
        animal.setScientificName(request.getScientificName());
        animal.setExtinction(request.isExtinction());

        //Actualizar Zona Protegida
        //Verificamos si la zona que viene en el request es diferente a la actual o si no tenía zona
        if (request.getZonaProtegidaId() != null) {
            ZonaProtegidaModel nuevaZona = zonaProtegidaRepository.findById(request.getZonaProtegidaId())
                    .orElseThrow(() -> new RuntimeException("Error: Zona Protegida no encontrada."));
            animal.setZonaProtegida(nuevaZona);
        }

        //Lógica de la imagen
        // Solo actualizamos la imagen si el usuario envió un archivo nuevo
        if (imageFile != null && !imageFile.isEmpty()) {
            String newImagePath = fileStorageService.saveFile(imageFile);
            animal.setImage(newImagePath);
        }

        return animalRepository.save(animal);
    }



}