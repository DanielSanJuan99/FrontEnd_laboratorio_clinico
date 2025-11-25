# --- ETAPA 1: Construcción (Build) ---
FROM node:18-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build --configuration=production

# --- ETAPA 2: Servidor Web (Nginx) ---
FROM nginx:alpine

COPY --from=build /app/dist/laboratorio-clinico/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80