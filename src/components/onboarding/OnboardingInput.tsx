import React from 'react';

interface OnboardingInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  unit?: string;
  min?: number;
  max?: number;
  error?: string;
}

const OnboardingInput: React.FC<OnboardingInputProps> = ({
  label, type = 'text', value, onChange, placeholder, unit, min, max, error,
}) => (
  <div className="space-y-1.5">
    <label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={e => {
          const v = e.target.value;
          if (type === 'number' && v !== '') {
            const num = Number(v);
            if (max !== undefined && num > max) return;
            if (num < 0) return;
          }
          onChange(v);
        }}
        placeholder={placeholder}
        min={min}
        max={max}
        inputMode={type === 'number' ? 'numeric' : undefined}
        className={`w-full h-[52px] rounded-2xl border ${error ? 'border-destructive/60' : 'border-border/50'} bg-card/60 px-4 text-[15px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/40 transition-all`}
      />
      {unit && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-muted-foreground font-medium">{unit}</span>
      )}
    </div>
    {error && <p className="text-[11px] text-destructive mt-0.5">{error}</p>}
  </div>
);

export default OnboardingInput;
