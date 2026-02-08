package com.example.userapi.service;

import com.example.userapi.dto.ZonaResponse;
import com.example.userapi.model.ZonaProtegidaModel;
import com.example.userapi.repository.ZonaProtegidaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio para operaciones relacionadas con zonas protegidas.
 */
@Service
public class ZonasService {

    @Autowired
    ZonaProtegidaRepository zonaProtegidaRepository;


    /**
     * Devuelve la lista de zonas protegidas registradas.
     */
    public ResponseEntity<List<ZonaResponse>> findAll() {

        List<ZonaProtegidaModel> zonasProtegidaDB = zonaProtegidaRepository.findAll();

        List<ZonaResponse> zonasResponse = zonasProtegidaDB.stream().map(zonaProtegidaModel -> {
            ZonaResponse zonaResponse = new ZonaResponse();
            zonaResponse.setId(zonaProtegidaModel.getId());
            zonaResponse.setNombre(zonaProtegidaModel.getNombre());
            zonaResponse.setUbicacion(zonaProtegidaModel.getUbicacion());
            return zonaResponse;

        }).collect(Collectors.toList());

        return ResponseEntity.ok(zonasResponse);

    }





}
