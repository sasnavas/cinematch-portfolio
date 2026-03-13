# Etapa 1: Construcción con Node.js
FROM node:22-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Vite necesita la llave durante la compilación
ARG VITE_TMDB_API_KEY
ENV VITE_TMDB_API_KEY=$VITE_TMDB_API_KEY
RUN npm run build

# Etapa 2: Servidor Nginx
FROM nginx:alpine
# Copiamos el resultado de Vite a la carpeta pública de Nginx
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]