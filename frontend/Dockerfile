# Etapa 1: Construcción (Cambiado a node:20-alpine)
FROM node:20-alpine AS build-step
WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Etapa 2: Servidor de producción
FROM nginx:alpine
# La ruta dist/zonas-protegidas-angular/browser es el estándar de las versiones nuevas
COPY --from=build-step /app/dist/zonas_protegidas_angular/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
