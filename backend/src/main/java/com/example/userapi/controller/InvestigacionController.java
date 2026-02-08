package com.example.userapi.controller;

import com.example.userapi.dto.InvestigacionResponse;
import com.example.userapi.service.InvestigacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/investigaciones")
public class InvestigacionController {

    @Autowired
    private InvestigacionService investigacionService;

    /**
     * Devuelve todas las investigaciones registradas.
     */
    @GetMapping("/get")
    public ResponseEntity<List<InvestigacionResponse>> getInvestigaciones() {
        return investigacionService.findAll();
    }

    /**
     * Devuelve las investigaciones asociadas a una zona específica.
     * @param zonaId id de la zona
     */
    @GetMapping("/zona/{zonaId}")
    public ResponseEntity<List<InvestigacionResponse>> getInvestigacionesByZona(@PathVariable Long zonaId) {
        return investigacionService.getInvestigacionesByZona(zonaId);
    }

}
