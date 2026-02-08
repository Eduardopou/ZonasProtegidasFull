package com.example.userapi.service;

import com.example.userapi.dto.InvestigacionResponse;
import com.example.userapi.model.InvestigacionModel;
import com.example.userapi.repository.InvestigacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Servicio para operaciones sobre investigaciones científicas.
 */
@Service
public class InvestigacionService {

    @Autowired
    private InvestigacionRepository investigacionRepository;

    /**
     * Devuelve todas las investigaciones registradas.
     */
    public ResponseEntity<List<InvestigacionResponse>> findAll() {
        return ResponseEntity.ok(mapToResponse(investigacionRepository.findAll()));
    }

    /**
     * Devuelve investigaciones asociadas a una zona protegida.
     */
    public ResponseEntity<List<InvestigacionResponse>> getInvestigacionesByZona(Long zonaId) {

        List<InvestigacionModel> investigacionesDB = investigacionRepository.findByZonaProtegida_Id(zonaId);
        List<InvestigacionResponse> responses = mapToResponse(investigacionesDB);
        return ResponseEntity.ok(responses);
    }

    /**
     * Convierte modelos de investigación a DTOs de respuesta.
     */
    private List<InvestigacionResponse> mapToResponse(List<InvestigacionModel> models) {
        return models.stream().map(model -> {
            InvestigacionResponse res = new InvestigacionResponse();

            res.setId(model.getId());
            res.setTitulo(model.getTitulo());
            res.setInstitucion(model.getInstitucion());
            res.setInvestigadorPrincipal(model.getInvestigadorPrincipal());
            res.setFechaInicio(model.getFechaInicio());
            res.setEstado(model.getEstado());
            res.setResumen(model.getResumen());
            res.setPermisosGobierno(model.getPermisosGobierno());
            res.setProgreso(model.getProgreso());

            if (model.getZonaProtegida() != null) {
                res.setZonaProtegidaNombre(model.getZonaProtegida().getNombre());
            }

            return res;
        }).collect(Collectors.toList());
    }
}