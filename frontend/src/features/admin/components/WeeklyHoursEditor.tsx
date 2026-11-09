import { useState } from 'react'
import { Button, ErrorMessage, Spinner } from '@/components/ui'
import { useUpdateWeeklyHours, useWeeklyHours } from '../hooks/useAdmin'
import type { WeeklyHours } from '../types'
import { AdminCard } from './AdminCard'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const hhmm = (t: string) => t.slice(0, 5)

/** All 7 days, filling any missing ones with 9:00-21:00. */
function toWeek(saved: WeeklyHours[]): WeeklyHours[] {
  const byDay = new Map(saved.map((d) => [d.day_of_week, d]))
  return DAYS.map((_, i) => {
    const d = byDay.get(i)
    return d
      ? { ...d, start_time: hhmm(d.start_time), end_time: hhmm(d.end_time) }
      : { day_of_week: i, is_available: true, start_time: '09:00', end_time: '21:00' }
  })
}

export function WeeklyHoursEditor({ clinicTimeZone }: { clinicTimeZone?: string }) {
  const { data, isPending, error } = useWeeklyHours()
  return (
    <AdminCard
      title="Weekly hours"
      description={`When the doctor takes consultations${clinicTimeZone ? `, in clinic time (${clinicTimeZone})` : ''}.`}
    >
      {isPending && <Spinner />}
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      {data && <WeekForm initial={toWeek(data)} />}
    </AdminCard>
  )
}

function WeekForm({ initial }: { initial: WeeklyHours[] }) {
  const save = useUpdateWeeklyHours()
  const [week, setWeek] = useState(initial)
  const [saved, setSaved] = useState(false)

  const edit = (day: number, patch: Partial<WeeklyHours>) => {
    setSaved(false)
    setWeek((prev) => prev.map((d) => (d.day_of_week === day ? { ...d, ...patch } : d)))
  }

  const invalidDay = week.find((d) => d.is_available && d.end_time <= d.start_time)

  return (
    <>
      <ul className="divide-y divide-line">
        {week.map((d) => (
          <li key={d.day_of_week} className="flex flex-wrap items-center gap-4 py-3">
            <label className="flex w-36 items-center gap-2.5 text-sm font-medium">
              <input
                type="checkbox"
                checked={d.is_available}
                onChange={(e) => edit(d.day_of_week, { is_available: e.target.checked })}
                className="size-4 accent-forest-700"
              />
              {DAYS[d.day_of_week]}
            </label>
            {d.is_available ? (
              <div className="flex items-center gap-2 text-sm">
                <input
                  type="time"
                  aria-label={`${DAYS[d.day_of_week]} start`}
                  value={d.start_time}
                  onChange={(e) => edit(d.day_of_week, { start_time: e.target.value })}
                  className="rounded-lg border border-line bg-paper px-2 py-1.5"
                />
                <span className="text-muted">to</span>
                <input
                  type="time"
                  aria-label={`${DAYS[d.day_of_week]} end`}
                  value={d.end_time}
                  onChange={(e) => edit(d.day_of_week, { end_time: e.target.value })}
                  className="rounded-lg border border-line bg-paper px-2 py-1.5"
                />
              </div>
            ) : (
              <span className="text-sm text-muted">Not available</span>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <Button
          disabled={save.isPending || Boolean(invalidDay)}
          onClick={() => save.mutate(week, { onSuccess: () => setSaved(true) })}
        >
          {save.isPending ? 'Saving…' : 'Save hours'}
        </Button>
        {saved && <span role="status" className="text-sm text-forest-700">Hours saved</span>}
        {invalidDay && (
          <span className="text-sm text-danger">{DAYS[invalidDay.day_of_week]}: end time must be after start time.</span>
        )}
      </div>
      {save.error && <div className="mt-3"><ErrorMessage>{save.error.message}</ErrorMessage></div>}
    </>
  )
}
