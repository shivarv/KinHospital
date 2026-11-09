import { Button, EmptyState, ErrorMessage, Spinner } from '@/components/ui'
import { useSlots } from '../hooks/useBooking'

interface SlotPickerProps {
  date: string
  timeZone: string
  value: string | null
  onChange: (start: string) => void
  /** Offered when a day has no free times. */
  onNextDay?: () => void
}

export function SlotPicker({ date, timeZone, value, onChange, onNextDay }: SlotPickerProps) {
  const { data: slots, isPending, error } = useSlots(date, timeZone)

  if (!date) return <EmptyState>Pick a date to see available times.</EmptyState>
  if (isPending) return <Spinner label="Finding available times" />
  if (error) return <ErrorMessage>{error.message}</ErrorMessage>
  if (slots.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-line px-4 py-6 text-center">
        <p className="text-sm text-muted">No times are free on this date.</p>
        {onNextDay && (
          <Button size="sm" variant="secondary" className="mt-3" onClick={onNextDay}>
            Show the next day
          </Button>
        )}
      </div>
    )
  }

  return (
    <fieldset>
      <legend className="sr-only">Available times</legend>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {slots.map((slot) => {
          const selected = slot.start === value
          return (
            <label
              key={slot.start}
              className={`cursor-pointer rounded-xl border px-2 py-2 text-center text-sm transition-colors has-focus-visible:ring-3 has-focus-visible:ring-forest-500/30 ${
                selected
                  ? 'border-forest-700 bg-forest-700 text-cream'
                  : 'border-line bg-paper text-ink hover:border-forest-500'
              }`}
            >
              <input
                type="radio"
                name="slot"
                value={slot.start}
                checked={selected}
                onChange={() => onChange(slot.start)}
                className="sr-only"
              />
              {slot.label}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
