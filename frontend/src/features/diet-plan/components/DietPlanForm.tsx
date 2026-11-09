import { Download, Drumstick, Salad } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Button, ErrorMessage, Spinner, TextField } from '@/components/ui'
import { useDietConditions, useDownloadDietChart } from '../hooks/useDietPlan'
import type { DietType } from '../types'

const DIET_TYPES: { value: DietType; label: string; icon: typeof Salad }[] = [
  { value: 'veg', label: 'Vegetarian', icon: Salad },
  { value: 'nonveg', label: 'Non-vegetarian', icon: Drumstick },
]

const tile =
  'cursor-pointer rounded-2xl border bg-paper p-4 transition-colors has-checked:border-forest-700 has-checked:bg-sage-100 has-focus-visible:ring-3 has-focus-visible:ring-forest-500/30 border-line hover:border-forest-500/60'

export function DietPlanForm() {
  const { data: conditions, isPending, error } = useDietConditions()
  const download = useDownloadDietChart()
  const [condition, setCondition] = useState('')
  const [dietType, setDietType] = useState<DietType>('veg')
  const [name, setName] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (condition) download.mutate({ condition, dietType, name })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <fieldset className="space-y-4">
        <legend className="font-display text-2xl text-forest-900">1. What would you like support with?</legend>
        {isPending && <Spinner />}
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
        <div className="grid gap-3 sm:grid-cols-2">
          {conditions?.map((c) => (
            <label key={c.slug} className={tile}>
              <input
                type="radio"
                name="condition"
                value={c.slug}
                checked={condition === c.slug}
                onChange={() => setCondition(c.slug)}
                className="sr-only"
              />
              <span className="block font-medium text-forest-900">{c.name}</span>
              <span className="mt-1 block text-sm text-muted">{c.summary}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="font-display text-2xl text-forest-900">2. Your diet</legend>
        <div className="grid max-w-md grid-cols-2 gap-3">
          {DIET_TYPES.map(({ value, label, icon: Icon }) => (
            <label key={value} className={`${tile} flex items-center gap-3`}>
              <input
                type="radio"
                name="diet_type"
                value={value}
                checked={dietType === value}
                onChange={() => setDietType(value)}
                className="sr-only"
              />
              <Icon className="size-5 text-forest-700" strokeWidth={1.5} aria-hidden />
              <span className="font-medium text-forest-900">{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="max-w-md">
        <TextField
          label="Name on the chart (optional)"
          maxLength={80}
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        {download.error && <ErrorMessage>{download.error.message}</ErrorMessage>}
        {download.isSuccess && !download.isPending && (
          <p role="status" className="text-sm text-forest-700">Your diet chart has downloaded.</p>
        )}
        <Button
          type="submit"
          size="lg"
          disabled={!condition || download.isPending}
          icon={<Download className="size-4" aria-hidden />}
        >
          {download.isPending ? 'Preparing your chart…' : 'Download diet chart (PDF)'}
        </Button>
        {!condition && <p className="text-sm text-muted">Choose a concern above to continue.</p>}
      </div>
    </form>
  )
}
