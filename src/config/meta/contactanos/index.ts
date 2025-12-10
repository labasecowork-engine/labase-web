export const contactanosMeta = {
  title: "Contacto - La Base",
  description:
    "Ponte en contacto con nosotros para obtener más información sobre nuestros espacios de coworking, planes, precios o cualquier consulta relacionada con La Base Cowork en Huancayo.",
  keywords:
    "contacto coworking, información, La Base Cowork, consulta coworking, espacio de trabajo Huancayo, contacto oficina",
  canonical: "https://labase.pe/contacto",
  image: "https://labase.pe/src/assets/images/contacto-cowork.jpg",
  type: "website",
  robots: "index, follow",
  structuredData: {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contacto - La Base Cowork",
    url: "https://labase.pe/contacto",
    image: "https://labase.pe/src/assets/images/contacto-cowork.jpg",
    description:
      "Contáctanos para saber más sobre los servicios que ofrece La Base Cowork. Estamos aquí para resolver todas tus dudas sobre coworking.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+51 123 456 789",
      contactType: "customer service",
      availableLanguage: "Spanish",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Real 123, Huancayo",
      addressLocality: "Huancayo",
      addressRegion: "Junín",
      postalCode: "12001",
      addressCountry: "PE",
    },
  },
};
