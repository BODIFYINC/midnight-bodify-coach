import type { HTMLInputTypeAttribute } from 'react';
import { cn } from '@/lib/utils';

interface ProfileInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  unit?: string;
}

export const ProfileInput = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  unit,
}: ProfileInputProps) => {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'w-full h-12 rounded-2xl border border-border/60 bg-card/60 px-4 text-sm text-foreground',
            'placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40',
            unit ? 'pr-12' : ''
          )}
          inputMode={type === 'number' ? 'numeric' : undefined}
        />
        {unit ? (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground">
            {unit}
          </span>
        ) : null}
      </div>
    </label>
  );
};
