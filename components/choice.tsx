"use client";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
export function Choice({
  id,
  value,
  onChange,
  options,
  label,
}: {
  id: string;
  value: string;
  onChange: (s: string) => void;
  options: { value: string; label: string }[];
  label: string;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <Select value={value} onValueChange={(next) => {
        // Form integration may emit an empty initialization value. Only a real option changes the draft.
        if (options.some((option) => option.value === next)) onChange(next);
      }}>
        <SelectTrigger id={id} className="choice">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem value={o.value} key={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
