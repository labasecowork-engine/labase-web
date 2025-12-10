# Arquitectura - La Base Cowork

## Índice

- [Resumen Arquitectónico](#-resumen-arquitectónico)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura de Componentes](#-arquitectura-de-componentes)
- [Estructura de Directorios](#-estructura-de-directorios)
- [SEO y Performance](#-seo-y-performance)
- [Configuraciones](#-configuraciones)
- [Guías de Desarrollo](#-guías-de-desarrollo)

## Resumen Arquitectónico

**La Base Cowork** está construido siguiendo una **arquitectura híbrida moderna** que combina:

- **Static Site Generation (SSG)** para páginas estáticas
- **Server-Side Rendering (SSR)** para contenido dinámico
- **Client-Side Hydration** para interactividad avanzada
- **Component-Driven Development** para reutilización y mantenibilidad

### Principios Arquitectónicos

1. **Performance First**: Optimización para Core Web Vitals
2. **Accessibility**: WCAG 2.1 AA compliance
3. **Mobile First**: Diseño responsive desde el inicio
4. **SEO Optimized**: Structured data y meta tags completos
5. **Component Reusability**: Arquitectura modular y escalable
6. **Type Safety**: TypeScript en toda la aplicación

## Stack Tecnológico

### Core Framework

```typescript
// Astro como meta-framework principal
export default defineConfig({
  integrations: [react(), tailwind()],
  output: "server", // Híbrido SSR/SSG
});
```

### Dependencias Principales

#### Frontend Core

- **Astro 5.5.3** - Meta-framework para sitios web modernos
- **React 19.1.0** - Biblioteca para interfaces de usuario
- **TypeScript 5.4.2** - Tipado estático y tooling

#### Styling & Design System

- **Tailwind CSS 3.4.17** - Framework CSS utility-first
- **@fontsource-variable/playfair-display** - Tipografía premium
- **Lucide React** - Iconografía SVG optimizada

#### Animations & Interactions

- **GSAP 3.12.7** - Animaciones de alto rendimiento
- **Framer Motion 12.12.2** - Animaciones declarativas para React
- **Swiper 11.2.7** - Componentes de carrusel modernos

#### Forms & Validation

- **React Hook Form 7.60.0** - Gestión de formularios performante
- **@hookform/resolvers** - Resolvers para validación
- **Zod 3.25.76** - Schema validation TypeScript-first

#### Utilities & Services

- **Axios 1.10.0** - Cliente HTTP con interceptors
- **Sonner 2.0.3** - Sistema de notificaciones elegantes

## Arquitectura de Componentes

### Jerarquía de Componentes

```
src/components/
├── pages/             # Componentes específicos por página
│   ├── home/          # Página de inicio
│   ├── espacios/      # Gestión de espacios
│   ├── nosotros/      # Información del equipo
│   ├── testimonios/   # Sistema de testimonios
│   ├── contactanos/   # Formularios de contacto
│   ├── mentoria/      # Sistema de mentoría
│   ├── emprendimiento/# Programas de emprendimiento
│   └── shared/        # Componentes compartidos entre páginas
├── shared/            # Componentes globalmente reutilizables
│   ├── chatbot/       # Sistema de chat inteligente
│   └── newsletter_form/ # Formulario de suscripción
└── ui/                # Componentes base de UI
    └── modal/         # Sistema de modales
```

### Patrón de Componentes

#### 1. Estructura de Componente Típico

```typescript
// Componente React típico
interface ComponentProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export default function Component({
  title,
  description,
  children,
}: ComponentProps) {
  return (
    <section className="component-base-classes">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {children}
    </section>
  );
}
```

#### 2. Componente Astro Típico

```astro
---
// Component script (build time)
interface Props {
  title: string;
  image?: string;
}

const { title, image } = Astro.props;
---

<!-- Template (HTML) -->
<section class="astro-component">
  <h2>{title}</h2>
  {image && <img src={image} alt={title} />}
  <slot />
</section>

<style>
/* Scoped styles */
.astro-component {
  @apply py-24;
}
</style>
```

## Estructura de Directorios

### Organización Detallada

```
labase-web/
├── public/                    # Assets estáticos
│   ├── images/                # Imágenes optimizadas
│   │   ├── espacios/          # Fotos de espacios (WebP)
│   │   ├── mentores/          # Fotos del equipo
│   │   └── team/              # Imágenes adicionales
│   ├── videos/                # Videos promocionales
│   └── favicon.svg            # Favicon vectorial
│
├── src/
│   ├── components/           # Componentes React/Astro
│   │   ├── pages/            # Componentes por página
│   │   │   ├── home/         # Landing page components
│   │   │   ├── espacios/     # Workspace gallery & pricing
│   │   │   ├── nosotros/     # Team & company info
│   │   │   ├── testimonios/  # Reviews & testimonials
│   │   │   ├── contactanos/  # Contact forms & map
│   │   │   ├── mentoria/     # Mentorship program
│   │   │   ├── emprendimiento/ # Startup programs
│   │   │   └── shared/       # Cross-page components
│   │   ├── shared/           # Global reusable components
│   │   └── ui/               # Base UI components
│   │
│   ├── config/               # Application configuration
│   │   └── meta/             # SEO metadata by page
│   │
│   ├── hooks/                # Custom React hooks
│   │   └── use_scroll/       # Scroll position hook
│   │
│   ├── layouts/              # Page layouts
│   │   └── core/             # Main layout template
│   │
│   ├── pages/                # Astro pages (file-based routing)
│   │   ├── index.astro       # Homepage (/)
│   │   ├── espacios/         # Workspaces (/espacios)
│   │   ├── nosotros/         # About us (/nosotros)
│   │   ├── testimonios/      # Testimonials (/testimonios)
│   │   ├── contactanos/      # Contact (/contactanos)
│   │   ├── mentoria/         # Mentorship (/mentoria)
│   │   └── emprendimiento/   # Entrepreneurship (/emprendimiento)
│   │
│   ├── services/             # External services & APIs
│   ├── styles/               # Global CSS
│   ├── types/                # TypeScript type definitions
│   └── utilities/            # Helper functions
│
├── astro.config.mjs        # Astro configuration
├── tailwind.config.cjs     # Tailwind CSS config
└── package.json            # Dependencies & scripts
```

### Convenciones de Nomenclatura

#### Archivos y Directorios

- **PascalCase**: Componentes React (`HeaderSection.tsx`)
- **kebab-case**: Directorios y archivos Astro (`hero_section/index.astro`)
- **camelCase**: Utilities y hooks (`useScrollPosition.ts`)
- **UPPER_CASE**: Constantes y configuraciones (`API_ENDPOINTS.ts`)

## 🔍 SEO y Performance

### Meta Tags Configuration

```typescript
// config/meta/index.ts
export const homeMeta = {
  title: "La Base Cowork - Espacio de Trabajo Colaborativo en Huancayo",
  description: "Únete al principal espacio de coworking en Huancayo...",
  keywords: "coworking Huancayo, espacio trabajo, emprendimiento...",
  canonical: "https://labase.pe",
  image: "https://labase.pe/images/og-home.jpg",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    // ... más structured data
  },
};
```

### Performance Optimizations

#### Image Optimization

```astro
---
// Imágenes optimizadas con lazy loading
---
<img
  src="/images/espacios/arsenal/1.webp"
  alt="Arsenal workspace"
  loading="lazy"
  decoding="async"
  class="w-full h-full object-cover"
/>
```

#### Code Splitting

```typescript
// Lazy loading de componentes pesados
const MentorsSection = lazy(() => import("./MentorsSection"));

// En el componente padre
<Suspense fallback={<LoadingSpinner />}>
  <MentorsSection client:load />
</Suspense>;
```

#### Bundle Optimization

```javascript
// astro.config.mjs
export default defineConfig({
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            animations: ["gsap", "framer-motion"],
          },
        },
      },
    },
  },
});
```

### Core Web Vitals Targets

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **FCP (First Contentful Paint)**: < 1.8s

## ⚙️ Configuraciones

### Astro Configuration

```javascript
// astro.config.mjs
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      config: { path: "./tailwind.config.cjs" },
    }),
  ],
  output: "server", // Habilita SSR
  server: {
    port: 3000,
    host: true,
  },
  build: {
    inlineStylesheets: "auto",
  },
});
```

### Tailwind Configuration

```javascript
// tailwind.config.cjs
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        secondary: ["Playfair Display Variable", "serif"],
      },
      colors: {
        stone: {
          // Palette personalizada
        },
      },
    },
  },
  plugins: [],
};
```

### TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "*": ["./src/components/*"],
      "@/layouts/*": ["./src/layouts/*"]
    }
  }
}
```

## Guías de Desarrollo

### Workflow de Desarrollo

#### 1. Branch Strategy

```bash
main                    # Producción
├── develop            # Desarrollo principal
├── feature/new-page   # Nuevas características
├── fix/bug-name       # Correcciones
└── hotfix/urgent-fix  # Fixes críticos
```

#### 2. Commit Convention

```bash
feat: add new mentor section
fix: resolve mobile navigation issue
docs: update README installation guide
style: improve button hover effects
refactor: optimize image loading component
test: add unit tests for contact form
```

#### 3. Development Process

```bash
# Iniciar desarrollo
npm run dev

# Linting y formatting
npm run lint
npm run format

# Build y testing
npm run build
npm run preview
```

### Code Quality Standards

#### 1. TypeScript

```typescript
// ✅ Tipos explícitos
interface MentorData {
  id: number;
  name: string;
  role: string;
  experience: string;
  specialties: string[];
}

// ✅ Props tipadas
interface ComponentProps {
  mentors: MentorData[];
  onSelect?: (mentor: MentorData) => void;
}
```

#### 2. React Best Practices

```typescript
// ✅ Custom hooks para lógica reutilizable
const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, open, close };
};

// ✅ Memoización para performance
const ExpensiveComponent = memo(({ data }: Props) => {
  const processedData = useMemo(
    () => data.map((item) => processItem(item)),
    [data]
  );

  return <div>{/* Render */}</div>;
});
```

#### 3. Accessibility Guidelines

```astro
<!-- ✅ Semantic HTML -->
<section aria-labelledby="team-section-title" role="region">
  <h2 id="team-section-title">Nuestro Equipo</h2>

  <!-- ✅ ARIA labels -->
  <div role="list" aria-label="Lista de miembros del equipo">
    <div role="listitem" aria-label="Perfil de Rafael Aguirre">
      <!-- Content -->
    </div>
  </div>
</section>
```

### Performance Guidelines

#### 1. Image Optimization

```astro
<!-- ✅ WebP format + lazy loading -->
<img
  src="/images/espacios/arsenal/1.webp"
  alt="Descriptive alt text"
  loading="lazy"
  decoding="async"
  class="w-full h-full object-cover"
/>
```

#### 2. Component Loading Strategies

```astro
---
// ✅ Client directives estratégicos
---

<!-- Solo hidrata cuando es visible -->
<InteractiveComponent client:visible />

<!-- Hidrata inmediatamente -->
<CriticalComponent client:load />

<!-- Hidrata cuando el usuario interactúa -->
<ModalComponent client:idle />
```

#### 3. Bundle Optimization

```typescript
// ✅ Dynamic imports para code splitting
const LazyComponent = lazy(() => import("./components/LazyComponent"));

// ✅ Tree shaking friendly imports
import { specificFunction } from "library";
// ❌ import * as library from 'library';
```

### Testing Strategy

#### 1. Component Testing

```typescript
// __tests__/components/Button.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../Button";

describe("Button", () => {
  it("renders with correct text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

#### 2. E2E Testing

```typescript
// e2e/contact-form.spec.ts
import { test, expect } from "@playwright/test";

test("contact form submission", async ({ page }) => {
  await page.goto("/contactanos");

  await page.fill('[name="name"]', "John Doe");
  await page.fill('[name="email"]', "john@example.com");
  await page.fill('[name="message"]', "Test message");

  await page.click('button[type="submit"]');

  await expect(page.locator(".success-message")).toBeVisible();
});
```

### Deployment Guidelines

#### 1. Production Build

```bash
# Build optimizado para producción
npm run build

# Preview del build
npm run preview

# Análisis del bundle
npm run analyze
```

#### 2. Environment Variables

```bash
# .env.production
PUBLIC_SITE_URL=https://labase.pe
PUBLIC_ANALYTICS_ID=GA_MEASUREMENT_ID
PUBLIC_RECAPTCHA_SITE_KEY=RECAPTCHA_SITE_KEY
```
