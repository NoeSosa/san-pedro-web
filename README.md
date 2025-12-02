# 🏛️ Sitio Web Oficial - H. Ayuntamiento de San Pedro Huamelula

> Portal digital moderno, accesible y transparente para la gestión municipal y difusión cultural de San Pedro Huamelula.

![Estado del Proyecto](https://img.shields.io/badge/Estado-Producci%C3%B3n-green)
![Astro](https://img.shields.io/badge/Astro-v5.0-orange)
![Tailwind](https://img.shields.io/badge/Tailwind-v4.0-blue)
![Keystatic](https://img.shields.io/badge/CMS-Keystatic-purple)

## 📋 Descripción

Este proyecto es una aplicación web estática (con capacidades de servidor) diseñada para mejorar la comunicación entre el gobierno municipal y la ciudadanía. Permite la publicación de noticias, gestión de documentos de transparencia, difusión de tradiciones y acceso rápido a trámites y números de emergencia.

## ✨ Características Principales

* **📰 Portal de Noticias Dinámico:** Sistema tipo "Bento Grid" con noticias destacadas y listado cronológico. Soporte para etiquetas (badges) con colores personalizados.
* **🎭 Carrusel de Tradiciones:** Sección visual para destacar la cultura local (Boda de la Lagarta, Danzas, etc.).
* **📑 Transparencia Gubernamental:** Repositorio de documentos PDF (Actas, Finanzas, Obras) descargables y organizados por categorías.
* **🛡️ Panel de Administración (CMS):** Gestión de contenido visual mediante **Keystatic**. No requiere tocar código para subir noticias o documentos.
* **🔒 Seguridad:** Autenticación Básica (Middleware) para proteger el acceso al panel administrativo.
* **🚨 Banner de Emergencias:** Acceso rápido a números de Policía, Protección Civil y Ambulancias desde cualquier parte del sitio.
* **📱 Diseño Responsivo:** Optimizado para celulares, tablets y escritorio.

## 🛠️ Tecnologías Utilizadas

* **Core:** [Astro](https://astro.build/) (con Adaptador Node.js).
* **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) + `@tailwindcss/typography`.
* **CMS:** [Keystatic](https://keystatic.com/) (Modo Local).
* **Componentes UI:** React (para carruseles y panel).
* **Servidor:** Node.js + PM2 (Process Manager).
* **Despliegue:** Cloudflare Tunnel.

## 🚀 Instalación y Desarrollo Local

Si deseas clonar y editar este proyecto en tu computadora:

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/NoeSosa/san-pedro-web.git)
    cd nombre-del-repo
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    Crea un archivo `.env` en la raíz y define las credenciales de administración:
    ```env
    ADMIN_USER=admin
    ADMIN_PASSWORD='TuContraseñaSegura'
    ```

4.  **Iniciar servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    Visita `http://localhost:4321`.

## 📝 Gestión de Contenido (Admin)

Para agregar noticias, documentos o tradiciones:

1.  Ingresa a `/keystatic` (ej: `http://localhost:4321/keystatic`).
2.  Introduce las credenciales definidas en tu archivo `.env`.
3.  **Importante:** En modo local, los cambios se guardan en tu disco duro (`src/content/`). Debes hacer `git push` para subirlos al repositorio.

## 🖥️ Guía de Despliegue (Servidor Linux)

El proyecto corre en un servidor Linux usando **PM2** para mantenerse activo 24/7 y **Cloudflare Tunnel** para la salida a internet.

### Comandos de Mantenimiento

Cada vez que subas cambios a GitHub, actualiza el servidor con estos pasos:

1.  **Descargar cambios:**
    ```bash
    git pull origin main
    ```

2.  **Reconstruir el sitio:**
    ```bash
    npm run build
    ```

3.  **Reiniciar el proceso:**
    ```bash
    pm2 restart huamelula-web
    ```

### Comandos Útiles de PM2

* Ver estado del servidor: `pm2 list`
* Ver logs (errores/actividad): `pm2 logs huamelula-web`
* Ver URL del túnel: `pm2 logs mi-tunel --lines 100`

## 📂 Estructura del Proyecto

```text
/
├── public/              # Imágenes y Favicon
├── src/
│   ├── components/      # Componentes reutilizables (Card, Carrusel)
│   ├── content/         # Base de datos local (Noticias, Tradiciones, Docs)
│   │   └── config.ts    # Esquemas de datos (Zod)
│   ├── layouts/         # Estructura principal (Header, Footer, Head)
│   ├── pages/           # Rutas del sitio
│   │   ├── noticias/    # Generación dinámica de noticias
│   │   ├── tramite.astro
│   │   └── transparencia.astro
│   ├── styles/          # CSS Global (Tailwind config)
│   └── middleware.ts    # Seguridad y protección de rutas
├── astro.config.mjs     # Configuración de Astro
├── keystatic.config.ts  # Configuración del CMS
└── package.json
