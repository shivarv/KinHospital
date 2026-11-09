import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'

const control =
  'w-full rounded-xl border border-line bg-paper px-3.5 py-2.5 text-[0.95rem] text-ink placeholder:text-muted/70 transition-colors focus:border-forest-500 focus:outline-hidden focus:ring-3 focus:ring-forest-500/15 disabled:opacity-60'

interface FieldShellProps {
  id: string
  label: string
  hint?: string
  required?: boolean
  children: ReactNode
}

function FieldShell({ id, label, hint, required, children }: FieldShellProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required && <span className="text-care-rose-ink"> *</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-muted">{hint}</p>}
    </div>
  )
}

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string }

export function TextField({ label, hint, id, required, className = '', ...props }: TextFieldProps) {
  const fallbackId = useId()
  const inputId = id ?? fallbackId
  return (
    <FieldShell id={inputId} label={label} hint={hint} required={required}>
      <input id={inputId} required={required} className={`${control} ${className}`} {...props} />
    </FieldShell>
  )
}

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  hint?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

export function SelectField({ label, hint, id, required, options, placeholder, className = '', ...props }: SelectFieldProps) {
  const fallbackId = useId()
  const selectId = id ?? fallbackId
  return (
    <FieldShell id={selectId} label={label} hint={hint} required={required}>
      <select id={selectId} required={required} className={`${control} ${className}`} {...props}>
        {placeholder !== undefined && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldShell>
  )
}

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; hint?: string }

export function TextAreaField({ label, hint, id, required, className = '', ...props }: TextAreaFieldProps) {
  const fallbackId = useId()
  const areaId = id ?? fallbackId
  return (
    <FieldShell id={areaId} label={label} hint={hint} required={required}>
      <textarea id={areaId} required={required} className={`${control} min-h-28 ${className}`} {...props} />
    </FieldShell>
  )
}

export function CheckboxField({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-[0.95rem] text-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-4 rounded border-line accent-forest-700"
      />
      {label}
    </label>
  )
}
