import { clsx, type ClassValue } from "clsx";

export const toSnakeCase = (text: string) =>
  text
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/\s+/g, "_")
    .toLowerCase();

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export function cn(...inputs: ClassValue[]): string {
  const combinedClasses = clsx(inputs);

  const classes = combinedClasses.split(/\s+/).filter(Boolean);

  const processedClasses = new Map<string, string>();

  classes.forEach((cls) => {
    const match = cls.match(/^(.*?:)?([^:]+)$/);

    if (!match) return;

    const [, prefix = "", baseClass] = match;

    const baseMatch = baseClass.match(/^([a-z0-9]+)(-|$)/);

    if (!baseMatch) {
      processedClasses.set(cls, cls);
      return;
    }

    const baseName = prefix + baseMatch[1];

    processedClasses.set(baseName, cls);
  });

  return Array.from(processedClasses.values()).join(" ");
}
