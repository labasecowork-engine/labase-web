import { contact, routes, social } from "@/config";
import type { ContactInfo } from "../types";

export const socialLinksData = [
  {
    href: social.facebook.url,
    label: "Síguenos en Facebook",
    platform: "facebook",
  },
  {
    href: social.instagram.url,
    label: "Síguenos en Instagram",
    platform: "instagram",
  },
  {
    href: social.tiktok.url,
    label: "Síguenos en TikTok",
    platform: "tiktok",
  },
];

export const contactInfo: ContactInfo = {
  phone: contact.phone,
  email: contact.email,
  address: contact.address1 + " " + contact.address2,
};

export const secondaryLinks = [
  {
    href: routes.home,
    label: "Inicio",
  },
  {
    href: routes.about,
    label: "Acerca",
  },
  {
    href: routes.spaces,
    label: "Nuestros espacios",
  },
  {
    href: routes.testimonial,
    label: "Testimonios",
  },
  {
    href: routes.platform,
    label: "Plataforma",
  },
];
