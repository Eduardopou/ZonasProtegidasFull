# Back_Token_Test


Probando cambio de fusion

# UserAPI - Backend Spring Boot

Este proyecto es una API RESTful desarrollada con Spring Boot para la gestión de usuarios, animales, zonas protegidas e investigaciones científicas. Incluye autenticación JWT, subida de imágenes y conexión a base de datos MySQL.

---

## Requisitos previos

- **Java 17** o superior
- **Maven 3.8+** (incluido wrapper `./mvnw`)
- **MySQL** (o MariaDB compatible)
- Acceso a internet para descargar dependencias

---

## Instalación y configuración

### 1. Clona el repositorio
```bash
git clone <URL_DEL_REPO>
cd userapi
```

### 2. Configura la base de datos
Crea una base de datos llamada `users_test` en tu servidor MySQL:
```sql
CREATE DATABASE users_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Asegúrate de tener un usuario y contraseña válidos. Por defecto:
- Usuario: `root`
- Contraseña: `1234`

Puedes cambiar estos valores en `src/main/resources/application.properties`:
```properties
spring.datasource.username=root
spring.datasource.password=1234
```

### 3. Configura la clave de la API Gemini
El archivo `application.properties` incluye una clave de API para Gemini:
```properties
gemini.api.key=TU_API_KEY
```
Cámbiala por tu propia clave si es necesario.

### 4. Instala las dependencias
Usa Maven Wrapper para instalar todo automáticamente:
```bash
./mvnw clean install
```

### 5. Ejecuta la aplicación
Puedes correr el backend con:
```bash
./mvnw spring-boot:run
```
O generar el JAR y ejecutarlo:
```bash
./mvnw package
java -jar target/userapi-0.0.1-SNAPSHOT.jar
```

---

## Endpoints principales
- `/api/auth/login` y `/api/auth/register`: Autenticación y registro
- `/animal/get-animals`: Listado público de animales
- `/admin/*`: Endpoints protegidos para administradores
- `/api/users/profile/*`: Endpoints para usuarios autenticados

---

## Subida de imágenes
Las imágenes se almacenan en la carpeta `uploads/` y se exponen vía `/uploads-static/`.

---

## Dependencias principales
- Spring Boot (Web, Security, Data JPA, WebFlux)
- MySQL Connector
- Lombok
- JJWT (JSON Web Token)
- H2 (opcional, para pruebas)

---

## Notas adicionales
- Si usas Windows, reemplaza `./mvnw` por `mvnw.cmd` en los comandos.
- Puedes cambiar la configuración de la base de datos y puertos en `application.properties`.
- El proyecto incluye ejemplos de configuración para desarrollo rápido.

---

## Simulación de comandos

```bash
# Clonar el repositorio
git clone https://github.com/tuusuario/userapi.git
cd userapi

# Crear la base de datos en MySQL
mysql -u root -p -e "CREATE DATABASE users_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Instalar dependencias y compilar
./mvnw clean install

# Ejecutar la aplicación
env SPRING_PROFILES_ACTIVE=dev ./mvnw spring-boot:run
```

---

¿Dudas? Revisa los archivos `HELP.md` y la documentación de Spring Boot.