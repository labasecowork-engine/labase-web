import {
  ArrowRight,
  X,
  MapPin,
  Mail,
  Linkedin,
  ExternalLink,
  Calendar,
  Award,
} from "lucide-react";
import { useState } from "react";

interface Mentor {
  id: number;
  name: string;
  role: string;
  image: string;
  specialties: string[];
  experience: string;
  description: string;
  email: string;
  linkedin: string;
  location: string;
  achievements: string[];
  workSummary: string;
  mentorshipAreas: string[];
  successStories: string;
}

const mentors: Mentor[] = [
  {
    id: 1,
    name: "RAFAEL AGUIRRE",
    role: "ABOGADO & CEO BASE COWORK",
    image: "/images/mentores/rafael_aguirre.webp",
    specialties: ["Derecho Empresarial", "Gestión de Negocios", "Liderazgo"],
    experience: "15+ años",
    description:
      "Especialista en derecho empresarial y gestión de negocios con amplia experiencia en el desarrollo de startups y empresas consolidadas.",
    email: "rafael.aguirre@labase.pe",
    linkedin: "https://linkedin.com/in/rafaelaguirre",
    location: "Huancayo, Perú",
    achievements: [
      "Fundador y CEO de La Base Cowork",
      "Asesor legal de más de 100 startups",
      "Especialista en derecho empresarial con 15+ años de experiencia",
    ],
    workSummary:
      "Rafael ha liderado la transformación del ecosistema emprendedor en Huancayo, creando espacios de trabajo colaborativo y programas de incubación que han impulsado más de 200 proyectos empresariales. Su experiencia en derecho empresarial y gestión de negocios lo convierte en un mentor invaluable para emprendedores que buscan estructurar legalmente sus empresas y desarrollar estrategias de crecimiento sostenible.",
    mentorshipAreas: [
      "Estructura legal empresarial",
      "Estrategia de negocios",
      "Liderazgo ejecutivo",
      "Desarrollo organizacional",
    ],
    successStories:
      "Ha mentoreado a más de 50 emprendedores, ayudándolos a conseguir inversiones por un total de $2M+ y a crear más de 300 empleos directos en la región.",
  },
  {
    id: 2,
    name: "FABRIZIO VILLAVICENCIO",
    role: "MASTER FINANCE & DOCENTE EN FINANZAS",
    image: "/images/mentores/fabrizio_villavicencio.webp",
    specialties: [
      "Finanzas Corporativas",
      "Inversiones",
      "Planificación Financiera",
    ],
    experience: "12+ años",
    description:
      "Experto en finanzas corporativas y planificación financiera, con experiencia en docencia y consultoría empresarial.",
    email: "fabrizio.villavicencio@labase.pe",
    linkedin: "https://linkedin.com/in/fabriziovillavicencio",
    location: "Huancayo, Perú",
    achievements: [
      "Master en Finanzas Corporativas",
      "Docente universitario en finanzas",
      "Consultor financiero de empresas Fortune 500",
    ],
    workSummary:
      "Fabrizio combina su experiencia académica con la práctica empresarial, habiendo asesorado a empresas en la optimización de sus estructuras financieras y estrategias de inversión. Su enfoque pedagógico y experiencia práctica lo convierten en un mentor excepcional para emprendedores que necesitan desarrollar modelos financieros sólidos y estrategias de financiamiento efectivas.",
    mentorshipAreas: [
      "Modelado financiero",
      "Estrategias de financiamiento",
      "Análisis de inversiones",
      "Planificación financiera estratégica",
    ],
    successStories:
      "Sus mentoreados han conseguido financiamiento por más de $1.5M y han mejorado sus márgenes de rentabilidad en un promedio del 35%.",
  },
  {
    id: 3,
    name: "ANDERSON ECHEVARRIA",
    role: "MARKETING DIGITAL & CEO SEBAM",
    image: "/images/mentores/anderson_echevarria.webp",
    specialties: ["Marketing Digital", "Estrategia de Marca", "Growth Hacking"],
    experience: "10+ años",
    description:
      "Especialista en marketing digital y estrategias de crecimiento, con experiencia liderando equipos y desarrollando marcas exitosas.",
    email: "anderson.echevarria@sebam.pe",
    linkedin: "https://linkedin.com/in/andersonechevarria",
    location: "Huancayo, Perú",
    achievements: [
      "CEO y Fundador de SEBAM",
      "Especialista certificado en Google Ads y Facebook Ads",
      "Creador de campañas con ROI superior al 400%",
    ],
    workSummary:
      "Anderson ha revolucionado el marketing digital en la región, desarrollando estrategias innovadoras que han posicionado marcas locales a nivel nacional. Su experiencia en growth hacking y marketing de performance lo convierte en el mentor ideal para emprendedores que buscan escalar sus negocios digitalmente y construir marcas sólidas en el mercado.",
    mentorshipAreas: [
      "Estrategia de marketing digital",
      "Growth hacking",
      "Branding y posicionamiento",
      "Optimización de conversiones",
    ],
    successStories:
      "Ha ayudado a más de 80 empresas a incrementar sus ventas online en un promedio del 250% y a reducir su costo de adquisición de clientes en un 40%.",
  },
];

export default function MentorsSection() {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

  const openModal = (mentor: Mentor) => {
    setSelectedMentor(mentor);
  };

  const closeModal = () => {
    setSelectedMentor(null);
  };

  return (
    <>
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-8 mb-24">
          <p className="text-stone-600 text-center text-lg tracking-[0.35em] uppercase mb-4">
            NUESTROS MENTORES
          </p>
          <h2 className="text-stone-950 text-center text-5xl font-bold font-secondary uppercase">
            EXPERTOS QUE TE GUIARÁN
          </h2>
          <p className="text-stone-600 mt-6 text-center text-base tracking-wider">
            Contamos con mentores especializados en diferentes áreas, listos
            para compartir su experiencia y conocimiento contigo. Cada mentor ha
            sido seleccionado por su trayectoria profesional y capacidad para
            impulsar el crecimiento de otros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-7xl px-8">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white border border-stone-200 overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
              onClick={() => openModal(mentor)}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-medium font-secondary uppercase mb-1 tracking-wide text-stone-950">
                      {mentor.name}
                    </h3>
                    <p className="text-sm text-stone-600 tracking-wider mb-2">
                      {mentor.role}
                    </p>
                    <p className="text-xs text-stone-500 font-medium">
                      {mentor.experience} de experiencia
                    </p>
                  </div>

                  <button className="ml-4 p-2 bg-stone-100 rounded-full group-hover:bg-stone-900 transition-colors duration-300 flex-shrink-0">
                    <ArrowRight className="w-4 h-4 text-stone-600 group-hover:text-white transition-colors duration-300" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedMentor && (
        <div className="fixed inset-0 z-40 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-2xl bg-white shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="h-full overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-stone-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-stone-500" />
                  </button>
                  <h2 className="text-lg font-semibold text-stone-900 font-secondary uppercase tracking-wide">
                    Perfil del Mentor
                  </h2>
                </div>

                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 text-sm font-medium text-stone-700 bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors tracking-wider uppercase">
                    Compartir perfil
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors tracking-wider uppercase">
                    Agendar sesión
                  </button>
                </div>
              </div>

              {/* Profile Section */}
              <div className="p-6">
                <div className="flex items-start space-x-6 mb-8">
                  <div className="relative">
                    <img
                      src={selectedMentor.image}
                      alt={selectedMentor.name}
                      className="w-24 h-24 rounded-2xl object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-stone-900 mb-2 font-secondary uppercase tracking-wide">
                      {selectedMentor.name}
                    </h3>
                    <p className="text-stone-600 mb-3 tracking-wider">
                      {selectedMentor.role}
                    </p>
                    <div className="flex items-center text-sm text-stone-500 mb-4">
                      <MapPin className="w-4 h-4 mr-2" />
                      {selectedMentor.location}
                    </div>

                    <div className="flex items-center space-x-4 text-sm">
                      <a
                        href={`mailto:${selectedMentor.email}`}
                        className="text-stone-600 hover:text-stone-900 flex items-center transition-colors"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Contactar
                      </a>
                      <a
                        href={selectedMentor.linkedin}
                        className="text-stone-600 hover:text-stone-900 flex items-center transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Experience Badge */}
                <div className="bg-stone-50 p-4 rounded-lg mb-8">
                  <div className="flex items-center mb-2">
                    <Award className="w-5 h-5 text-stone-600 mr-2" />
                    <span className="text-sm font-medium text-stone-900 uppercase tracking-wider">
                      Experiencia
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-stone-900 font-secondary">
                    {selectedMentor.experience}
                  </p>
                </div>

                {/* Specialties */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-stone-900 mb-4 font-secondary uppercase tracking-wide">
                    Especialidades
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMentor.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="text-xs bg-stone-100 text-stone-700 px-3 py-2 rounded-full tracking-wider"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Work Summary */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="w-1 h-6 bg-stone-500 rounded-full mr-3"></div>
                    <h4 className="text-lg font-semibold text-stone-900 font-secondary uppercase tracking-wide">
                      Resumen Profesional
                    </h4>
                  </div>
                  <p className="text-stone-700 leading-relaxed tracking-wider">
                    {selectedMentor.workSummary}
                  </p>
                </div>

                {/* Achievements */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-stone-900 mb-4 font-secondary uppercase tracking-wide">
                    Logros Destacados
                  </h4>
                  <ul className="space-y-3">
                    {selectedMentor.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-stone-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-stone-700 tracking-wider">
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mentorship Areas */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-stone-900 mb-4 font-secondary uppercase tracking-wide">
                    Áreas de Mentoría
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedMentor.mentorshipAreas.map((area, index) => (
                      <div key={index} className="bg-stone-50 p-3 rounded-lg">
                        <span className="text-sm text-stone-700 tracking-wider">
                          {area}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Success Stories */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-stone-900 mb-4 font-secondary uppercase tracking-wide">
                    Historias de Éxito
                  </h4>
                  <div className="bg-stone-50 p-6 rounded-lg">
                    <p className="text-stone-700 leading-relaxed tracking-wider italic">
                      "{selectedMentor.successStories}"
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-stone-900 p-6 rounded-lg text-center">
                  <h5 className="text-white font-semibold mb-3 font-secondary uppercase tracking-wide">
                    ¿Listo para comenzar?
                  </h5>
                  <p className="text-stone-300 text-sm mb-4 tracking-wider">
                    Agenda tu primera sesión de mentoría y da el siguiente paso
                    en tu crecimiento profesional.
                  </p>
                  <button className="w-full py-3 px-6 bg-white text-stone-900 font-medium rounded-lg hover:bg-stone-100 transition-colors tracking-wider uppercase">
                    Agendar Primera Sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
