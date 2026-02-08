Zonas Protegidas - Sistema de Gestión Full-Stack

Este proyecto es una solución integral para la gestión y monitoreo de zonas protegidas, animales e investigaciones científicas. Está construido con una arquitectura moderna de microservicios dockerizados, integrando inteligencia artificial para diagnósticos y un sistema robusto de autenticación.

Tecnologías Utilizadas

| Componente | Tecnologías |

Frontend | **Angular 20**, Angular Material, ngx-translate (i18n) |
Backend** | **Spring Boot 3.5.4**, Java 17, Spring Security, JWT |
IA| Integración con **Google Gemini API** |
Base de Datos** | **MySQL 8.0** |
Infraestructura** | **Docker**, Docker Compose  |

Características Principales

Autenticación Segura: Sistema de Login y Registro protegido mediante JSON Web Tokens (JWT).
Gestión de Datos: CRUD completo para animales, zonas y reportes de investigación.
Diagnóstico Inteligente: Módulo que utiliza la API de Gemini para analizar estados de salud o datos de investigación.
Multilingüe: Interfaz disponible en varios idiomas gracias a `@ngx-translate`.
Despliegue Automatizado: Configuración de salud (healthchecks) en Docker para asegurar la sincronización de servicios.

Instalación Rápida

La ventaja de este proyecto es que puedes levantarlo completo con un solo comando.

Requisitos previos
Docker y Docker Compose instalados.

Pasos

1. Clona el repositorio:

git clone https://github.com/tu-usuario/ZonasProtegidasFull.git
cd ZonasProtegidasFull

2. Configura las variables de entorno:
Crea un archivo `.env` en la raíz (usa `.env.template` como guía) y añade tu clave de Gemini y la contraseña de la DB.

4. Levanta el proyecto:
docker-compose up --build

Accede a la aplicación en: `http://localhost:4200`

Estructura del Proyecto (Monorepo)

/
├── frontend/        # Aplicación Angular 20
├── backend/         # API REST con Spring Boot 3.5.4
├── db-init/         # Scripts SQL para inicializar la base de datos con datos de prueba
├── mysql_data/      # Volumen persistente para la base de datos (ignorado en Git)
└── docker-compose.yml # Orquestador de servicios

Seguridad y Buenas Prácticas

Persistencia de Datos: Se utilizan volúmenes para asegurar que la información de la DB y las imágenes subidas no se pierdan al reiniciar contenedores.
Variables de Entorno: No se incluyen credenciales sensibles en el código fuente; todo se gestiona externamente.
Construcción Multietapa: Los Dockerfiles están optimizados para generar imágenes ligeras y seguras (utilizando Nginx para el front y JRE para el back).

Autor

Eduardo Rios.
Estudiante de Ciencias Computacionales | CUT - UdeG

Email djlaloo59@gmail.com
