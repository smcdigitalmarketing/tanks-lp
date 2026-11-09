import {
  Ban,
  Check,
  Feather,
  Heart,
  Layers,
  PackageCheck,
  Palette,
  RotateCcw,
  Ruler,
  ShieldCheck,
  Shirt,
  Sun,
  Truck,
  type LucideIcon,
} from "lucide-react";

/** Icons content files may name. Keeps content plain data. */
export const icons = {
  noHooks: Ban,
  check: Check,
  feather: Feather,
  heart: Heart,
  layers: Layers,
  package: PackageCheck,
  palette: Palette,
  returns: RotateCcw,
  ruler: Ruler,
  shield: ShieldCheck,
  shirt: Shirt,
  sun: Sun,
  truck: Truck,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function Icon({
  name,
  className = "size-5",
}: {
  name: IconName;
  className?: string;
}) {
  const C = icons[name];
  return <C aria-hidden="true" className={className} />;
}
