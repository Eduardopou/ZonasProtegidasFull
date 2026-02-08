# ZonasProtegidasAngular

Este proyecto es una aplicación Angular para la visualización y gestión de zonas protegidas. A continuación se describe detalladamente cómo instalar y ejecutar el proyecto en cualquier computador desde cero.

## Requisitos previos

- **Node.js** (recomendado v18.x o superior). Puedes instalarlo usando [nvm](https://github.com/nvm-sh/nvm) para gestionar versiones:

  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  # Cierra y abre tu terminal, luego:
  nvm install 18
  nvm use 18
  ```

- **npm** (se instala junto con Node.js)
- **Angular CLI** (versión 20.x):

  ```bash
  npm install -g @angular/cli@20
  ```

- **Git** (opcional, para clonar el repositorio):

  ```bash
  sudo apt install git # En Ubuntu/Debian
  # o
  brew install git     # En MacOS
  ```

## Instalación de dependencias del proyecto

1. Clona el repositorio o descarga el código fuente:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd zonas-protegidas-angular
   ```

2. Instala las dependencias del proyecto:

   ```bash
   npm install
   ```

   Esto instalará todas las dependencias listadas en `package.json`, incluyendo:

   - @angular/core, @angular/cli, @angular/material, @ngx-translate/core, rxjs, zone.js, etc.

   Si necesitas instalar alguna dependencia manualmente, puedes hacerlo así:

   ```bash
   npm install @angular/material @ngx-translate/core @ngx-translate/http-loader rxjs zone.js
   ```

## Variables de entorno

- Si tu backend está en otra URL o puerto, revisa los archivos de servicios (por ejemplo, `src/app/services/auth.service.ts`) y ajusta la variable `apiUrl` según corresponda.

## Ejecución del proyecto

1. Inicia el servidor de desarrollo:

   ```bash
   npm start
   # o
   ng serve
   ```

2. Abre tu navegador en [http://localhost:4200](http://localhost:4200)

## Scripts útiles

- `npm start`: Inicia el servidor de desarrollo.
- `npm run build`: Compila la aplicación para producción en la carpeta `dist/`.
- `npm test`: Ejecuta los tests unitarios con Karma.

## Dependencias principales

- Angular 20.x
- Angular Material
- RxJS
- @ngx-translate/core y @ngx-translate/http-loader

Consulta el archivo `package.json` para ver la lista completa de dependencias y versiones.

## Notas adicionales

- Si tienes problemas con dependencias nativas o errores de OpenSSL, asegúrate de usar Node.js 18 y el flag `--openssl-legacy-provider` (ya incluido en el script `npm start`).
- Para desarrollo en Windows, se recomienda usar Git Bash o WSL para mejor compatibilidad con scripts.

## Recursos útiles

- [Documentación oficial de Angular](https://angular.dev/)
- [Angular CLI](https://angular.dev/tools/cli)
- [Guía de Angular Material](https://material.angular.io/)

---

Si tienes dudas o problemas, revisa los issues del repositorio o contacta al equipo de desarrollo.
