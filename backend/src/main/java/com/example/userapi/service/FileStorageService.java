package com.example.userapi.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

/**
 * Servicio para almacenar archivos en el servidor.
 * Principalmente usado para imágenes de usuarios y animales.
 */
@Service
public class FileStorageService {
    // Carpeta raíz donde se guardan los archivos subidos
    private final Path root = Paths.get("uploads");

    public FileStorageService() {
        try {
            Files.createDirectories(root);
        } catch (IOException e) {
            throw new RuntimeException("No se pudo inicializar la carpeta de carga de archivos", e);
        }
    }

    /**
     * Guarda un archivo en el servidor y devuelve la ruta web accesible.
     * @param file El archivo MultipartFile recibido.
     * @return Ruta web donde se guardó el archivo.
     */
    public String saveFile(MultipartFile file) {
        try {
            // Genera un nombre de archivo único para evitar colisiones
            String filename = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();

            // Resuelve la ruta completa (ej. /uploads/uuid-ajolote.png)
            Path destinationFile = this.root.resolve(filename);

            // Copia los bytes del archivo a la ruta de destino
            Files.copy(file.getInputStream(), destinationFile);

            // Devuelve la ruta que se usará para acceder a la imagen desde la web
            // "/uploads-static/")
            return "/uploads-static/" + filename;
        } catch (IOException e) {
            throw new RuntimeException("Error al guardar el archivo", e);
        }
    }
}