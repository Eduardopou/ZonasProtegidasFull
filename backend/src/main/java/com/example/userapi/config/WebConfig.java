package com.example.userapi.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    /**
     * Mapea peticiones web a recursos en el disco.
     * Esto permite que las imágenes en "/uploads" sean accesibles
     * a través de la URL "/uploads-static/**".
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                //La URL por la que se accederá desde el navegador
                .addResourceHandler("/uploads-static/**")
                //La carpeta física en el servidor donde están los archivos
                // "file:./uploads/" apunta a la carpeta "uploads" en la raíz del proyecto
                .addResourceLocations("file:./uploads/");
    }
}