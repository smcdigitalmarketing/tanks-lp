import type { ReactNode } from "react";

/*
 * Form fields for the contact form and the checkout: a visible label, the
 * error under the field, and aria-invalid/aria-describedby so screen readers
 * hear the error too.
 */

const ERROR = "text-[#b3261e]";
const base =
  "mt-1 block w-full rounded-[10px] border bg-surface px-3 py-2.5 text-[15px] text-ink outline-none focus:border-ink focus:ring-1 focus:ring-ink";

function ariaFor(id: string, error?: string) {
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
  } as const;
}

function Shell({
  id,
  label,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className={`mt-1 text-sm ${ERROR}`}>
          {error}
        </p>
      )}
    </div>
  );
}

export function Field({
  label,
  name,
  error,
  type = "text",
  multiline = false,
  className,
  defaultValue,
  ...rest
}: {
  label: string;
  name: string;
  error?: string;
  type?: string;
  multiline?: boolean;
  className?: string;
  defaultValue?: string;
  autoComplete?: string;
  placeholder?: string;
  inputMode?: "text" | "email" | "numeric" | "tel";
  maxLength?: number;
}) {
  const id = `f-${name}`;
  const cls = `${base} ${error ? "border-[#b3261e]" : "border-line"}`;
  return (
    <Shell id={id} label={label} error={error} className={className}>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={5}
          className={cls}
          defaultValue={defaultValue}
          {...ariaFor(id, error)}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          className={cls}
          defaultValue={defaultValue}
          {...ariaFor(id, error)}
          {...rest}
        />
      )}
    </Shell>
  );
}

export function SelectField({
  label,
  name,
  options,
  error,
  className,
  defaultValue,
  autoComplete,
  placeholder,
}: {
  label: string;
  name: string;
  options: [value: string, label: string][];
  error?: string;
  className?: string;
  defaultValue?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  const id = `f-${name}`;
  return (
    <Shell id={id} label={label} error={error} className={className}>
      <select
        id={id}
        name={name}
        defaultValue={defaultValue ?? ""}
        autoComplete={autoComplete}
        className={`${base} ${error ? "border-[#b3261e]" : "border-line"}`}
        {...ariaFor(id, error)}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </Shell>
  );
}
