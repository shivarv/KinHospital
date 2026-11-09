export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'light'
export type ButtonSize = 'md' | 'lg' | 'sm'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-55'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-forest-700 text-cream hover:bg-forest-900',
  secondary: 'border border-forest-700/30 bg-paper text-forest-900 hover:border-forest-700 hover:bg-sage-100',
  ghost: 'text-forest-700 hover:bg-sage-100',
  danger: 'border border-danger/40 text-danger hover:bg-danger/5',
  /** For use on dark (forest) backgrounds. */
  light: 'bg-cream text-forest-900 hover:bg-sage-200',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-[0.95rem]',
  lg: 'px-7 py-3.5 text-base',
}

export function buttonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', extra = '') {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`.trim()
}
