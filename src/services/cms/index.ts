import { CMS_URL } from "@/config/env";

/** Media poblada por Payload (depth >= 1). */
export interface CmsMedia {
  id: string;
  url?: string;
  alt?: string;
  filename?: string;
  width?: number;
  height?: number;
}

export interface CmsBlock {
  blockType: string;
  id?: string;
  [key: string]: unknown;
}

export interface CmsSeo {
  title?: string;
  description?: string;
  keywords?: string;
  type?: string;
  robots?: string;
  canonical?: string;
  ogImage?: CmsMedia | string | null;
  structuredData?: unknown;
}

export interface CmsPage {
  id: string;
  title: string;
  slug: string;
  headerTransparent?: boolean;
  seo?: CmsSeo;
  layout?: CmsBlock[];
}

/** Devuelve la URL absoluta de un media del CMS (o "" si no aplica). */
export function mediaUrl(media: unknown): string {
  if (!media || typeof media === "string") return "";
  const m = media as CmsMedia;
  if (!m.url) return "";
  return m.url.startsWith("http") ? m.url : `${CMS_URL}${m.url}`;
}

/** Obtiene una página del CMS por su slug (SSR). `null` si no existe. */
export async function getPage(slug: string): Promise<CmsPage | null> {
  const url =
    `${CMS_URL}/api/pages?where[slug][equals]=${encodeURIComponent(slug)}` +
    `&depth=3&limit=1`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`[cms] getPage(${slug}) HTTP ${res.status}`);
      return null;
    }
    const json = (await res.json()) as { docs?: CmsPage[] };
    return json?.docs?.[0] ?? null;
  } catch (e) {
    console.error(`[cms] getPage(${slug}) error:`, e);
    return null;
  }
}

/** Lista los slugs de todas las páginas (para rutas estáticas si se requiere). */
export async function getPageSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${CMS_URL}/api/pages?limit=200&depth=0`);
    if (!res.ok) return [];
    const json = (await res.json()) as { docs?: { slug: string }[] };
    return (json.docs ?? []).map((d) => d.slug);
  } catch {
    return [];
  }
}
