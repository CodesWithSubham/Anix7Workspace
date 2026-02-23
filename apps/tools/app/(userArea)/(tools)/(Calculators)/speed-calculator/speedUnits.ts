import { SelectOption } from "@shared/components/ui/Input";

export const units: SelectOption[] = [
  { label: "Foot per minute (ft/min)", value: "ft_min" },
  { label: "Foot per second (ft/s)", value: "ft_s" },
  { label: "Meter per second (m/s)", value: "m_s" },
  { label: "Kilometer per hour (km/h)", value: "km_h" },
  { label: "Mile per hour (mph)", value: "mph" },
  { label: "Mile per minute", value: "mi_min" },
  { label: "Mile per second", value: "mi_s" },
  { label: "Knot (nautical mile per hour)", value: "knot" },
  { label: "Mach (at sea level, 20°C)", value: "mach" },
  { label: "Speed of light (c)", value: "c" },
  { label: "Centimeter per second (cm/s)", value: "cm_s" },
  { label: "Millimeter per second (mm/s)", value: "mm_s" },
  { label: "Yard per second (yd/s)", value: "yd_s" },
  { label: "Yard per minute (yd/min)", value: "yd_min" },
];

// Conversion factors (all relative to meter/second)
export const toMetersPerSecond: Record<string, number> = {
  ft_min: 0.00508,
  ft_s: 0.3048,
  m_s: 1,
  km_h: 0.277778,
  mph: 0.44704,
  mi_min: 26.8224,
  mi_s: 1609.344,
  knot: 0.514444,
  mach: 340.29,
  c: 299792458,
  cm_s: 0.01,
  mm_s: 0.001,
  yd_s: 0.9144,
  yd_min: 0.01524,
};
