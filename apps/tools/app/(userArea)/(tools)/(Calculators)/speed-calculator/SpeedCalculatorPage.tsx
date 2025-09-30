"use client";

import { useMemo, useState } from "react";
import { Button } from "@shared/components/ui/Button";
import { Input, Option, Select } from "@shared/components/ui/Input";
import Section from "@shared/components/ui/Section";
import Hr from "@shared/components/ui/Hr";
import { TbMobiledata } from "react-icons/tb";

const units: Option[] = [
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
const toMetersPerSecond: Record<string, number> = {
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

export default function SpeedCalculatorPage() {
  const [value, setValue] = useState<number | "">("");
  const [from, setFrom] = useState("m_s");
  const [to, setTo] = useState("km_h");

  const formattedResult = useMemo(() => {
    if (value === "" || isNaN(Number(value))) return null;

    const metersPerSec = Number(value) * toMetersPerSecond[from];
    const result = metersPerSec / toMetersPerSecond[to];

    console.log("result", result);

    if (result === Infinity) return "∞";
    if (result === 0) return "0";
    if (result > 1e9 || result < 1e-6) return result.toExponential(6);
    return result.toLocaleString(undefined, { maximumFractionDigits: 6 });
  }, [value, from, to]);

  console.log("formattedResult", formattedResult);

  const swapUnits = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <Section className="max-w-3xl mx-auto p-4 space-y-6" title="⚡ Speed Converter">
      <p className="text-center text-sm text-gray-500">
        Convert between different speed units like mph, m/s, km/h, Mach, knots, and even the speed
        of light.
      </p>

      <div className="max-w-sm mx-auto">
        <Input
          type="number"
          placeholder="Enter value"
          label="Value"
          value={value}
          max={Number.MAX_SAFE_INTEGER}
          onChange={(e) => setValue(e.target.value === "" ? "" : Number(e.target.value))}
        />
      </div>

      <div className="flex max-sm:flex-col items-center justify-center">
        <div>
          <Select
            value={from}
            label="From"
            onChange={(e) => setFrom(e.target.value)}
            options={units}
          />
        </div>
        <div className="pt-3">
          <Button className="p-2" onClick={swapUnits} aria-label="Swap units">
            <TbMobiledata className="sm:rotate-90" />
          </Button>
        </div>

        <div>
          <Select value={to} label="To" onChange={(e) => setTo(e.target.value)} options={units} />
        </div>
      </div>

      <Hr />

      {formattedResult !== null && (
        <div className="bg-inherit border rounded-lg p-4 text-center">
          <h3 className="text-sm text-gray-400 mb-2">Converted Value</h3>
          <p className="text-2xl font-semibold">{formattedResult}</p>
          <p className="text-gray-500 text-sm mt-1">{units.find((u) => u.value === to)?.label}</p>
        </div>
      )}
    </Section>
  );
}
