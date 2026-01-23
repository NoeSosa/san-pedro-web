# 🚀 Migración Completa a Strapi v5 - Resumen

## ✅ Cambios Realizados

### 1. Actualización de Interfaces TypeScript (`src/interfaces/strapi.ts`)
- ✅ Cambiado `StrapiData<T>` de interfaz con `.attributes` a tipo plano intersección
- ✅ Actualizado `NoticiaAttributes`:
  - `destacado` → `Destacado` (con mayúscula, como viene de Strapi)
  - `fecha` → `fecha_publicacion`
  - `imagen_destacada`: `StrapiMedia` → `StrapiData<StrapiImageAttributes> | null`
  - `etiquetas`: De `{ data: [...] }` → Array directo `StrapiData<EtiquetaAttributes>[]`
- ✅ Actualizado `TradicionAttributes`:
  - `imagen_principal`: `StrapiMedia` → `StrapiData<StrapiImageAttributes> | null`
- ✅ Eliminado `slug` de `EtiquetaAttributes` (no existe en Strapi)

### 2. Cliente API (`src/lib/strapi.ts`)
- ✅ Implementado helper `stringifyQuery` para query params anidados
- ✅ Función `fetchApi` genérica con manejo de errores robus to
- ✅ Función `getStrapiMedia` para normalizar URLs de imágenes

### 3. Componentes Actualizados

#### `src/components/ui/NoticiaCard.astro`
- ✅ Eliminado acceso a `.attributes` (estructura plana)
- ✅ Corregido acceso a `imagen_destacada` (de `.data.attributes.url` → `.url`)
- ✅ Corregido acceso a `etiquetas` (de `.data` → directo con `?.`)

#### `src/components/TraditionCarousel.tsx`
- ✅ Eliminado `.attributes` al desestructurar tradición
- ✅ Corregido acceso a `imagen_principal` (de `.data.url` → `.url`)

#### `src/components/StrapiBlockRenderer.tsx`
- ✅ Componente React para renderizar BlocksContent de Strapi
- ⚠️ Pendiente: Tipar correctamente los props de componentes personalizados

### 4. Páginas Actualizadas

#### `src/pages/index.astro`
- ✅ Filtrado por `Destacado` (con mayúscula)
- ✅ Eliminado `.attributes` en acceso a propiedades
- ✅ Corregido acceso a imágenes (sin `.data`)
- ✅ Corregido acceso a etiquetas (array directo)
- ✅ Populate explícito con `fields` en lugar de `"*"`

#### `src/pages/noticias/index.astro`
- ✅ Eliminado campo `slug` del populate de etiquetas
- ✅ Corregido acceso a `etiquetas` (sin `.data`)
- ✅ Populate explícito con `fields`

#### `src/pages/noticias/[slug].astro`
- ✅ Eliminado campo `slug` del populate de etiquetas
- ✅ Corregido acceso a imágenes y etiquetas
- ✅ Eliminada prop `description` no existente en Layout

#### `src/pages/tradiciones/[slug].astro`
- ✅ Actualizado para usar estructura plana de Strapi v5
- ✅ SSR habilitado con `prerender = false`

### 5. Queries de API
Todas las queries ahora usan populate explícito:
```typescript
populate: {
  imagen_destacada: {
    fields: ["url", "alternativeText", "width", "height", "formats"]
  },
  etiquetas: {
    fields: ["nombre", "color"]
  }
}
```

---

## 🔧 Problemas Corregidos

1. ❌ `Cannot read properties of undefined (reading 'destacado')` → ✅ Usamos `Destacado` (mayúscula)
2. ❌ `Cannot read properties of undefined (reading 'map')` → ✅ Acceso directo a arrays con `?.`
3. ❌ `Strapi Error: Invalid key slug` → ✅ Eliminado campo inexistente
4. ❌ `Strapi Error: Invalid key related` → ✅ Populate explícito en lugar de `"*"`
5. ❌ `Strapi Error: Forbidden` → ✅ Configurar permisos públicos en Strapi Admin
6. ❌ Imágenes no cargan → ✅ Corregido acceso sin `.data.attributes`

---

## ⚠️ Configuración Pendiente en Strapi

### Permisos Públicos (Requerido)
Ve a Strapi Admin → **Settings** → **Users & Permissions** → **Roles** → **Public**

Habilita los siguientes permisos:
- ✅ `Noticia`: `find`, `findOne`
- ✅ `Tradicion`: `find`, `findOne`
- ✅ `Etiqueta`: `find`, `findOne`

### Estructura de Campos en Strapi
Asegúrate de que tus Content Types tengan:

**Noticia:**
- `titulo`: Text
- `slug`: UID (auto)
- `fecha_publicacion`: Date
- `contenido`: RichText (Blocks)
- `Destacado`: Boolean (con mayúscula inicial)
- `imagen_destacada`: Media (Single)
- `etiquetas`: Relation (Many to Many con Etiqueta)

**Etiqueta:**
- `nombre`: Text
- `color`: Text (ej: "bg-red-500 text-white" para clases de Tailwind)

**Tradicion:**
- `titulo`: Text
- `slug`: UID
- `descripcion`: Text
- `contenido`: RichText (Blocks)
- `imagen_principal`: Media (Single)

---

## 📦 Dependencias Instaladas
```json
{
  "@strapi/blocks-react-renderer": "^1.0.2",
  "@tailwindcss/typography": "^0.5.19"
}
```

---

## 🎨 Estilos de Etiquetas
En Strapi Admin, cuando crees etiquetas, usa el campo `color` con clases de Tailwind CSS completas:

**Ejemplos:**
- `bg-red-500 text-white` → Etiqueta roja
- `bg-blue-600 text-white` → Etiqueta azul
- `bg-green-500 text-white` → Etiqueta verde
- `bg-yellow-400 text-gray-900` → Etiqueta amarilla

El formato debe ser: `bg-{color}-{shade} text-{color}`

---

## 🚀 Próximos Pasos

1. **Reinicia el servidor de Astro** si está corriendo
2. **Verifica la consola** - No deberían aparecer errores de API
3. **Prueba las funcionalidades**:
   - Inicio: Noticias destacadas y tradiciones
   - /noticias: Listado con filtros por etiquetas
   - /noticias/[slug]: Detalle de noticias
   - /tradiciones/[slug]: Detalle de tradiciones
4. **Añade imágenes en Strapi** para ver las tarjetas completas
5. **Ajusta colores de etiquetas** en Strapi Admin

---

## 📝 Notas Importantes

- La estructura de Strapi v5 es **plana** (sin `.data.attributes`)
- Todos los accesos a relaciones ahora son **directos** (arrays u objetos)
- El populate debe ser **explícito** con `fields`
- Las etiquetas usan el campo `color` con **clases CSS completas**

---

**Fecha de migración**: 22 de enero de 2026
**Versiones**: Strapi v5, Astro v5, Tailwind CSS v4
