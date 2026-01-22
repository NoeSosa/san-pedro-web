# 🏛️ Sitio Web Oficial - H. Ayuntamiento de San Pedro Huamelula

> Portal digital moderno, accesible y transparente para la gestión municipal y difusión cultural de San Pedro Huamelula.

![Estado del Proyecto](https://img.shields.io/badge/Estado-Producci%C3%B3n-green)
![Astro](https://img.shields.io/badge/Astro-v5.15-orange)
![Tailwind](https://img.shields.io/badge/Tailwind-v4.1-blue)
![Strapi](https://img.shields.io/badge/CMS-Strapi_v5-purple)

## 📋 Análisis del Proyecto

Este proyecto representa la evolución digital del municipio de San Pedro Huamelula. Construido sobre **Astro 5**, aprovecha la arquitectura de "islas" para ofrecer un rendimiento excepcional, manteniendo la interactividad necesaria en secciones clave mediante **React**.

### Pilares Tecnológicos:
- **Rendimiento Extremo:** Generación estática y bajo demanda (SSR) optimizada.
- **Gestión de Contenido Headless:** Uso de **Strapi v5** como CMS centralizado para noticias, tradiciones y documentos.
- **Diseño de Vanguardia:** Implementación de **Tailwind CSS v4**, utilizando su nuevo motor basado en Vite.
- **Tipado Estricto:** Arquitectura robusta en TypeScript con interfaces definidas para todos los modelos de datos.

---

## ⚙️ Arquitectura de Datos (Strapi v5)

El sitio consume contenido dinámico desde una API REST de Strapi. La capa de conexión se encuentra en `src/lib/strapi.ts`.

### Modelos de Contenido
El proyecto está diseñado para consumir las siguientes colecciones desde Strapi:

| Colección | Descripción | Campos Clave |
| :--- | :--- | :--- |
| **Noticias** | Blog municipal. | `titulo`, `slug`, `contenido` (Blocks), `imagen_destacada`, `etiquetas`. |
| **Tradiciones** | Difusión cultural. | `titulo`, `slug`, `descripcion`, `imagen_principal`. |
| **Documentos** | Transparencia. | `titulo`, `fecha`, `archivo` (PDF), `categoria`. |
| **Etiquetas** | Categorización. | `nombre`, `color`. |

### Renderizado de Contenido Rico
El contenido de las noticias utiliza el formato de bloques JSON de Strapi, renderizado mediante un componente personalizado en `src/components/StrapiBlockRenderer.tsx` que utiliza Tailwind Typography.

---

## ✨ Características Principales

* **📰 Portal de Noticias Dinámico:** Sistema tipo "Bento Grid" con noticias destacadas y listado cronológico, alimentado por API.
* **🎭 Carrusel de Tradiciones:** Sección visual interactiva para destacar la cultura local.
* **📑 Transparencia Gubernamental:** Repositorio organizado de documentos PDF descargables.
* **🚨 Banner de Emergencias:** Acceso rápido a números de auxilio persistente en todo el sitio.
* **📱 Diseño Responsivo:** Optimizado para celulares, tablets y escritorio.

---

## 🛠️ Stack Tecnológico

* **Frontend:** [Astro v5](https://astro.build/) (SSR con adaptador Node.js).
* **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) + `@tailwindcss/typography`.
* **CMS:** [Strapi v5](https://strapi.io/) (Headless API).
* **UI:** [React v19](https://react.dev/) & [Swiper](https://swiperjs.com/).
* **Cliente HTTP:** Fetch nativo con utilidades personalizadas (`src/lib/strapi.ts`).

---

## 🚀 Instalación y Desarrollo Local

1.  **Clonar e Instalar:**
    ```bash
    git clone https://github.com/NoeSosa/san-pedro-web.git
    npm install
    ```

2.  **Variables de Entorno (.env):**
    Configura la conexión con tu instancia de Strapi:
    ```env
    PUBLIC_STRAPI_URL=http://localhost:1337
    STRAPI_API_TOKEN=tu_token_de_api_aqui
    ```

3.  **Ejecutar:**
    ```bash
    npm run dev
    ```

---

## 📂 Estructura del Proyecto

```text
/
├── public/              # Assets estáticos
├── src/
│   ├── components/      # Islas de React y componentes Astro
│   │   └── StrapiBlockRenderer.tsx # Renderizador de Rich Text
│   ├── interfaces/      # Tipos TypeScript para modelos de Strapi
│   │   └── strapi.ts
│   ├── lib/             # Lógica de cliente API
│   │   └── strapi.ts
│   ├── layouts/         # Plantillas maestras
│   ├── pages/           # Enrutamiento
│   │   └── noticias/
│   │       └── [slug].astro # Página dinámica de noticias
│   ├── styles/          # Configuración global de Tailwind 4
│   └── middleware.ts    # Middleware de Astro
├── astro.config.mjs     # Configuración del motor Astro
└── package.json         # Dependencias
```
