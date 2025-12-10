# La Base Cowork - Sitio Web

<div align="center">
  <img src="public/favicon.svg" alt="La Base Cowork" width="150"/>
  <br><br>
  <strong>Un ecosistema de posibilidades donde nace el futuro</strong>
  <br><br>
  
  [![Astro](https://img.shields.io/badge/Astro-5.5.3-FF5D01?style=flat-square&logo=astro&logoColor=white)](https://astro.build/)
  [![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.4.2-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
</div>

## Descripción

**La Base Cowork** es el principal espacio de trabajo colaborativo y emprendimiento en Huancayo, Perú. Nuestro sitio web refleja nuestra misión de conectar profesionales, emprendedores y startups en un entorno único de innovación y colaboración.

Este proyecto representa la primera versión de nuestra plataforma web, desarrollada con tecnologías modernas para ofrecer una experiencia de usuario excepcional y un diseño que refleja la energía y profesionalismo de nuestro espacio.

## Características

- **Diseño Moderno**: Interfaz elegante y profesional con animaciones fluidas
- **Responsive Design**: Optimizado para todos los dispositivos
- **Performance**: Carga rápida y optimización SEO
- **UX Centrada**: Experiencia de usuario intuitiva y accesible

## Tecnologías

### Frontend Core

- **[Astro 5.5.3](https://astro.build/)** - Framework web moderno
- **[React 19.1.0](https://react.dev/)** - Biblioteca para interfaces de usuario
- **[TypeScript 5.4.2](https://www.typescriptlang.org/)** - Tipado estático para JavaScript

### Styling & UI

- **[Tailwind CSS 3.4.17](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Playfair Display](https://fonts.google.com/specimen/Playfair+Display)** - Tipografía elegante
- **[Lucide React](https://lucide.dev/)** - Iconos SVG modernos
- **[Heroicons](https://heroicons.com/)** - Iconos de primera calidad

### Animaciones & Interactions

- **[GSAP 3.12.7](https://gsap.com/)** - Animaciones de alto rendimiento
- **[Framer Motion 12.12.2](https://www.framer.com/motion/)** - Animaciones para React
- **[Swiper 11.2.7](https://swiperjs.com/)** - Carruseles y sliders modernos

### Forms & Validation

- **[React Hook Form 7.60.0](https://react-hook-form.com/)** - Gestión de formularios
- **[Zod 3.25.76](https://zod.dev/)** - Validación de esquemas TypeScript
- **[reCAPTCHA](https://www.google.com/recaptcha/)** - Protección contra spam

### Utilities

- **[Axios 1.10.0](https://axios-http.com/)** - Cliente HTTP
- **[Sonner 2.0.3](https://sonner.emilkowal.ski/)** - Notificaciones elegantes

## Estructura del Proyecto

```
labase-web/
├── public/                    # Archivos estáticos
│   ├── images/               # Imágenes del sitio
│   │   ├── espacios/        # Fotos de los espacios
│   │   ├── mentores/        # Fotos del equipo
│   │   └── team/            # Imágenes del equipo
│   ├── videos/              # Videos promocionales
│   └── favicon.svg          # Favicon del sitio
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── pages/          # Componentes específicos por página
│   │   ├── shared/         # Componentes compartidos
│   │   └── ui/             # Componentes de interfaz
│   ├── config/             # Configuraciones
│   │   └── meta/           # Metadatos SEO
│   ├── hooks/              # Custom hooks de React
│   ├── layouts/            # Layouts de páginas
│   ├── pages/              # Páginas del sitio
│   ├── services/           # Servicios y APIs
│   ├── styles/             # Estilos globales
│   ├── types/              # Tipos TypeScript
│   └── utilities/          # Funciones utilitarias
└── docs/                   # Documentación (este archivo)
```

## Páginas Disponibles

### Páginas Activas (v1.0)

- **[Inicio](/)** - Página principal con hero y overview
- **[Espacios](/espacios)** - Galería y detalles de nuestros espacios
- **[Nosotros](/nosotros)** - Historia del equipo y misión
- **[Testimonios](/testimonios)** - Opiniones y experiencias de clientes
- **[Contacto](/contactanos)** - Formulario de contacto y ubicación

### 🚧 Páginas en Desarrollo (Próximas versiones)

- **[Blog](/blog)** - Artículos y noticias del ecosistema
- **[Emprendimiento](/emprendimiento)** - Programas de incubación y aceleración
- **[Mentoría](/mentoria)** - Programa de mentores especializados

## Instalación y Desarrollo

### Prerrequisitos

- **Node.js** 18.0.0 o superior
- **npm** o **yarn** como gestor de paquetes

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/labasecowork/labase-web.git
cd labase-web

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construir para producción
npm run preview  # Previsualizar build de producción
```

### Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
# Configuraciones de la aplicación
PUBLIC_SITE_URL=https://labase.pe
PUBLIC_RECAPTCHA_SITE_KEY=tu_clave_recaptcha

# APIs y servicios externos
PUBLIC_GOOGLE_MAPS_API_KEY=tu_clave_google_maps
PUBLIC_ANALYTICS_ID=tu_id_analytics
```

## Guía de Diseño

### Colores Principales

- **Stone 950**: `#0c0a09` (Texto principal)
- **Stone 600**: `#57534e` (Texto secundario)
- **Stone 100**: `#f5f5f4` (Backgrounds claros)

### Tipografía

- **Primaria**: System fonts (Inter)
- **Secundaria**: Playfair Display (Títulos)

### Componentes

Todos los componentes siguen principios de accesibilidad (WCAG 2.1) y están optimizados para SEO.

## SEO y Performance

- **Lighthouse Score**: 95+ en todas las métricas
- **Core Web Vitals**: Optimizado
- **Meta Tags**: Configuración completa por página
- **Schema.org**: Structured data implementado
- **Sitemap**: Generación automática

## 🔗 Enlaces Importantes

- **Sitio Web**: [https://labase.pe](https://labase.pe)
- **Email**: [labasecowork@gmail.com](mailto:labasecowork@gmail.com)
- **Teléfono**: [+51 960 270 555](tel:+51960270555)
- **Dirección**: Jr. Tacna 234, piso 10, Edificio Galena - Huancayo, Perú

### Redes Sociales

- **Facebook**: [@labasecowork](https://facebook.com/labasecowork)
- **Instagram**: [@labasecowork](https://instagram.com/labasecowork)
- **YouTube**: [La Base Cowork](https://youtube.com/@labasecowork)

## Agradecimientos

- Al equipo de **La Base Cowork** por su visión y liderazgo
- A la comunidad de **Astro** por un framework excepcional
- A nuestros **mentores y colaboradores** por hacer posible este

## Colaboradores

Gracias a todas las personas que han contribuido a este proyecto:

- [@Lenas25](https://github.com/Lenas25)
- [@yerikah](https://github.com/yerikah)
- [@michxlmg](https://github.com/michxlmg)
- [@JhonnySAVAL](https://github.com/JhonnySAVAL)

---

Construido con ❤️ por el equipo detrás del proyecto.
