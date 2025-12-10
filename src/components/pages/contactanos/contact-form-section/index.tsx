import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import apiClient from "@/services/";
import ReCAPTCHA from "react-google-recaptcha";
import { contact, social } from "@/config";

const contactSchema = z.object({
  firstName: z.string().min(2, { message: "El nombre es obligatorio." }),
  lastName: z.string().min(2, { message: "El apellido es obligatorio." }),
  email: z
    .string()
    .email({ message: "Por favor, ingresa un correo electrónico válido." }),
  phoneNumber: z
    .string()
    .regex(/^[0-9]+$/, { message: "Por favor, ingresa solo números." })
    .min(9, {
      message: "El número de teléfono debe tener al menos 9 dígitos.",
    }),
  reason: z.string().min(1, { message: "Debes seleccionar una razón." }),
  message: z
    .string()
    .min(10, { message: "El mensaje debe tener al menos 10 caracteres." }),
  recaptchaToken: z
    .string()
    .min(1, { message: "Por favor, completa la verificación." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

declare global {
  interface Window {
    onRecaptchaSuccess: (token: string) => void;
  }
}

export default function ContactFormSection() {
  const [submissionStatus, setSubmissionStatus] = useState<{
    message: string;
    success: boolean | null;
  } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      reason: "",
      message: "",
      recaptchaToken: "",
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setSubmissionStatus(null);
    }, 3000);
  }, [submissionStatus]);

  const onSubmit = async (data: ContactFormValues) => {
    setSubmissionStatus(null);

    try {
      const response = await apiClient.post("/form", data);
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        setSubmissionStatus({
          message: "¡Gracias por unirte! Te contactaremos pronto.",
          success: true,
        });
        reset();
      } else {
        throw new Error("El servidor respondió con un estado inesperado.");
      }

      setSubmissionStatus({
        message: "¡Gracias por contactarnos! Tu mensaje ha sido enviado.",
        success: true,
      });

      reset();
      if (typeof (window as any).grecaptcha !== "undefined") {
        (window as any).grecaptcha.reset(); // Resetea el widget de reCAPTCHA
      }
    } catch (error: any) {
      setSubmissionStatus({
        message:
          "Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.",
        success: false,
      });
    }
  };

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-[500px_1fr] gap-8 max-w-7xl mx-auto p-4 sm:p-8 py-24"
      role="main"
      aria-label="Sección de contacto"
    >
      <div
        className="bg-stone-800 text-white p-10"
        role="complementary"
        aria-label="Información de contacto"
      >
        <img
          src="/logo.png"
          alt="McReynolds Real Estate Team Logo"
          className="max-w-[150px] sm:max-w-[200px] mb-10"
          loading="lazy"
        />

        <div role="contentinfo">
          <a
            href="tel:707.469.3288"
            className="block text-white no-underline text-sm sm:text-base tracking-wider"
            aria-label="Llamar al teléfono: +51 960 270 555"
          >
            {contact.phone}
          </a>
          <a
            href="mailto:sarah@mcreynoldsrealestate.com"
            className="block text-white no-underline mb-8 text-sm sm:text-base tracking-wider"
            aria-label="Enviar correo a: contactolabase10@gmail.com"
          >
            {contact.email}
          </a>
          <address
            className="not-italic leading-relaxed text-sm sm:text-base tracking-wider"
            aria-label="Dirección física"
          >
            {contact.address1}
            <br />
            {contact.address2}
          </address>
        </div>
        <div
          className="space-y-2 mt-8"
          role="region"
          aria-label="Redes sociales"
        >
          <a
            href={social.facebook.url}
            target="_blank"
            className="flex items-center space-x-3 hover:text-stone-400 group transition-all duration-300"
            aria-label="Síguenos en Facebook"
          >
            <span
              className="size-10 rounded-full bg-stone-800 border border-stone-700 group-hover:bg-stone-600 group-hover:border-stone-600 transition-all duration-300 flex items-center justify-center"
              role="img"
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                className="text-stone-100 size-4 fill-current"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"></path>
              </svg>
            </span>
            <span>@{social.facebook.username}</span>
          </a>
          <a
            href={social.instagram.url}
            target="_blank"
            className="flex items-center space-x-3 hover:text-stone-400 group transition-all duration-300"
            aria-label="Síguenos en Instagram"
          >
            <span
              className="size-10 rounded-full bg-stone-800 border border-stone-700 group-hover:bg-stone-600 group-hover:border-stone-600 transition-all duration-300 flex items-center justify-center"
              role="img"
              aria-hidden="true"
            >
              <svg
                className="text-stone-100 size-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
              </svg>
            </span>
            <span>@{social.instagram.username}</span>
          </a>
          <a
            target="_blank"
            href={social.linkedin.url}
            className="flex items-center space-x-3 hover:text-stone-400 group transition-all duration-300"
            aria-label="Síguenos en LinkedIn"
          >
            <span
              className="size-10 rounded-full bg-stone-800 border border-stone-700 group-hover:bg-stone-600 group-hover:border-stone-600 transition-all duration-300 flex items-center justify-center"
              role="img"
              aria-hidden="true"
            >
              <svg
                className="text-stone-100 size-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <path d="M512 96L127.9 96C110.3 96 96 110.5 96 128.3L96 511.7C96 529.5 110.3 544 127.9 544L512 544C529.6 544 544 529.5 544 511.7L544 128.3C544 110.5 529.6 96 512 96zM231.4 480L165 480L165 266.2L231.5 266.2L231.5 480L231.4 480zM198.2 160C219.5 160 236.7 177.2 236.7 198.5C236.7 219.8 219.5 237 198.2 237C176.9 237 159.7 219.8 159.7 198.5C159.7 177.2 176.9 160 198.2 160zM480.3 480L413.9 480L413.9 376C413.9 351.2 413.4 319.3 379.4 319.3C344.8 319.3 339.5 346.3 339.5 374.2L339.5 480L273.1 480L273.1 266.2L336.8 266.2L336.8 295.4L337.7 295.4C346.6 278.6 368.3 260.9 400.6 260.9C467.8 260.9 480.3 305.2 480.3 362.8L480.3 480z"></path>
              </svg>
            </span>
            <span>@{social.linkedin.username}</span>
          </a>
          <a
            href={social.tiktok.url}
            className="flex items-center space-x-3 hover:text-stone-300 group transition-all duration-300"
            target="_blank"
            aria-label="Síguenos en TikTok"
          >
            <span
              className="size-10 rounded-full bg-stone-800 border border-stone-700 group-hover:bg-stone-600 group-hover:border-stone-600 transition-all duration-300 flex items-center justify-center"
              role="img"
              aria-hidden="true"
            >
              <svg
                className="text-stone-100 size-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"></path>
              </svg>
            </span>
            <span>@{social.tiktok.username}</span>
          </a>
        </div>
      </div>
      <form
        className="bg-white p-8 sm:p-14 shadow-sm"
        id="contactForm"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        role="form"
        aria-label="Formulario de contacto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 mt-4 sm:mt-0">
          <div>
            <label htmlFor="firstName" className="sr-only">
              Nombres
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Nombres"
              {...register("firstName")}
              className={`w-full p-3 border ${
                errors.firstName ? "border-red-500" : "border-stone-300"
              } text-sm sm:text-base tracking-wider bg-stone-50 placeholder:text-stone-400`}
              aria-invalid={!!errors.firstName}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="lastName" className="sr-only">
              Apellidos
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Apellidos"
              {...register("lastName")}
              className={`w-full p-3 border ${
                errors.lastName ? "border-red-500" : "border-stone-300"
              } text-sm sm:text-base tracking-wider bg-stone-50 placeholder:text-stone-400`}
              aria-invalid={!!errors.lastName}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            placeholder="Correo electrónico"
            {...register("email")}
            className={`w-full p-3 border ${
              errors.email ? "border-red-500" : "border-stone-300"
            } text-sm sm:text-base tracking-wider bg-stone-50 placeholder:text-stone-400`}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mt-4">
          <label htmlFor="phone" className="sr-only">
            Número de celular
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="Numero de celular"
            {...register("phoneNumber")}
            className={`w-full p-3 border ${
              errors.phoneNumber ? "border-red-500" : "border-stone-300"
            } text-sm sm:text-base tracking-wider bg-stone-50 placeholder:text-stone-400`}
            aria-invalid={!!errors.phoneNumber}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        <div className="mb-4 mt-4">
          <label htmlFor="topic" className="sr-only">
            Razón de contacto
          </label>
          <select
            id="topic"
            {...register("reason")}
            className={`w-full p-3 border ${
              errors.reason ? "border-red-500" : "border-stone-300"
            } text-sm sm:text-base tracking-wider bg-stone-50 placeholder:text-stone-400`}
            aria-invalid={!!errors.reason}
          >
            <option value="">Selecciona la razon</option>
            <option value="coworking">Coworking</option>
            <option value="emprendimiento">Emprendimiento</option>
            <option value="other">Otros</option>
          </select>
          {errors.reason && (
            <p className="text-red-500 text-xs mt-1">{errors.reason.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="sr-only">
            Mensaje
          </label>
          <textarea
            id="message"
            placeholder="Preguntas / Comentarios:"
            rows={4}
            {...register("message")}
            className={`w-full p-3 border ${
              errors.message ? "border-red-500" : "border-stone-300"
            } text-sm sm:text-base tracking-wider resize-y bg-stone-50 placeholder:text-stone-400`}
            aria-invalid={!!errors.message}
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <div className="mb-4" role="group" aria-label="Verificación reCAPTCHA">
          <Controller
            name="recaptchaToken"
            control={control}
            render={({ field }) => (
              <ReCAPTCHA
                sitekey="6LcOAh8rAAAAALrU8ZeT7xRhmSHU6BDKDB58m1fm"
                onChange={field.onChange}
              />
            )}
          />
          {errors.recaptchaToken && (
            <p className="text-red-500 text-xs mt-1">
              {errors.recaptchaToken.message}
            </p>
          )}
        </div>

        {submissionStatus && (
          <p
            className={`text-center ${
              submissionStatus.success ? "text-green-600" : "text-red-600"
            }`}
          >
            {submissionStatus.message}
          </p>
        )}

        <button
          type="submit"
          className="rounded-full w-fit text-stone-100 py-4 px-12 transition-colors duration-200 text-sm tracking-widest font-medium uppercase mt-8 bg-stone-500 hover:bg-stone-700 disabled:bg-stone-300 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Enviar formulario"}
        </button>
      </form>
    </div>
  );
}
