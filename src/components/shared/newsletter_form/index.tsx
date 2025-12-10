import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import apiClient from "@/services/";
import { AxiosError } from "axios";

const newsletterSchema = z.object({
  name: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres." }),
  email: z
    .string()
    .email({ message: "Por favor, ingresa un correo electrónico válido." }),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

export const NewsletterForm = () => {
  const [submissionStatus, setSubmissionStatus] = useState<{
    message: string;
    success: boolean;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
  });

  const toTitleCase = (str: string): string => {
    if (!str) return "";
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const onSubmit = async (data: NewsletterFormValues) => {
    setSubmissionStatus(null);
    data.name = toTitleCase(data.name);

    try {
      console.log(data);
      const response = await apiClient.post("/newsletter/subscribe", data);
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        setSubmissionStatus({
          message: "¡Gracias por unirte! Te contactaremos pronto.",
          success: true,
        });
        reset();
      } else {
        console.log("El servidor respondió con un estado inesperado.");
        throw new Error("El servidor respondió con un estado inesperado.");
      }
    } catch (error: unknown) {
      console.log(error);
      let errorMessage =
        "Hubo un error al enviar la solicitud. Inténtalo de nuevo.";

      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const responseData = error.response?.data;

        if (
          status === 400 &&
          responseData?.description?.includes("already subscribed")
        ) {
          errorMessage =
            "Este correo electrónico ya está registrado. ¡Intenta con otro!";
        } else if (responseData?.description) {
          errorMessage = responseData.description;
        } else {
          errorMessage =
            "Ocurrió un problema en el servidor. Por favor, intenta más tarde.";
        }
      } else if (error instanceof Error) {
        errorMessage =
          "No se pudo conectar con el servidor. Revisa tu conexión a internet.";
      }

      setSubmissionStatus({
        message: errorMessage,
        success: false,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-col w-full h-full grid grid-cols-1 lg:grid-cols-2 bg-white"
    >
      <div>
        <img
          src="/images/espacios/base_operativa/4.webp"
          alt="La Base Cowork"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="bg-white px-8 py-24 lg:px-24 lg:py-60 md:h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-lg mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold uppercase text-stone-900 mb-4 font-secondary">
            SÉ PARTE DE LA BASE
            <br />
            COWORK
          </h2>
          <p className="text-stone-500 text-left mb-8 text-sm">
            Regístrate para recibir noticias y actualizaciones sobre nuestros
            servicios.
          </p>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block font-medium text-stone-700 text-left mb-2 text-sm"
            >
              Nombre completo
            </label>
            <input
              id="name"
              type="text"
              placeholder="Ej. Juan Pérez"
              {...register("name")}
              className={`mt-1 rounded-md block w-full bg-white border text-sm px-4 py-3 text-stone-700 focus:ring-stone-500 focus:border-stone-500 outline-none placeholder:text-stone-400 ${
                errors.name ? "border-rose-800" : "border-stone-200"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-rose-800 text-left">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-medium text-stone-700 text-left mb-2 text-sm"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="Ej. juanperez@gmail.com"
              {...register("email")}
              className={`mt-1 rounded-md block w-full bg-white border text-sm px-4 py-3 text-stone-700 focus:ring-stone-500 focus:border-stone-500 outline-none placeholder:text-stone-400 ${
                errors.email ? "border-rose-800" : "border-stone-200"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-rose-800 text-left">
                {errors.email.message}
              </p>
            )}
          </div>

          <p className="text-sm text-stone-500 text-left mb-4">
            Al suscribirte, aceptas nuestras{" "}
            <a href="/politicas" className="text-stone-700 underline">
              políticas de privacidad
            </a>
            .
          </p>
          {submissionStatus && (
            <p
              className={`mt-4 text-center text-sm font-medium ${
                submissionStatus.success
                  ? "text-emerald-800 bg-emerald-800/10 px-4 py-3 rounded-md"
                  : "text-rose-800 bg-rose-800/10 px-4 py-3 rounded-md font-medium"
              }`}
            >
              {submissionStatus.message}
            </p>
          )}

          <button
            type="submit"
            className="mt-4 w-full uppercase tracking-widest text-sm bg-stone-600 hover:bg-stone-700 text-white font-medium py-4 px-6 rounded-full transition-colors duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Suscribiéndote..." : "Suscribirme"}
          </button>
        </div>
      </div>
    </form>
  );
};
