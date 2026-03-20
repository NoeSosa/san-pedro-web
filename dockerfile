# Usamos una imagen ligera de Node
FROM node:20-alpine

# Directorio de trabajo dentro de la cajita
WORKDIR /app

# Copiamos los archivos de dependencias primero (para aprovechar caché)
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos todo el resto del código
COPY . .

# Recibimos la variable desde docker-compose
ARG PUBLIC_KEYSTATIC_MODE
# La convertimos en variable de entorno para el build
ENV PUBLIC_KEYSTATIC_MODE=$PUBLIC_KEYSTATIC_MODE

# Construimos el proyecto (esto crea la carpeta dist/)
RUN npm run build

# Exponemos el puerto interno de Astro
EXPOSE 4321

# Variables de entorno para que Astro sepa que es un servidor
ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=production

# Comando para iniciar la web
CMD ["node", "./dist/server/entry.mjs"]
