# Usa una imagen de Node.js compatible con tu aplicación React
FROM node:16

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia todos los archivos del proyecto al directorio de trabajo en el contenedor
COPY . .

# Instala las dependencias
RUN npm install --force

# Establece la variable de entorno NODE_OPTIONS para deshabilitar los módulos ES
ENV NODE_OPTIONS="--experimental-modules=false"

# Expone el puerto 3000 en el contenedor
EXPOSE 3000

# Comando por defecto para ejecutar la aplicación
CMD ["npm", "start"]

