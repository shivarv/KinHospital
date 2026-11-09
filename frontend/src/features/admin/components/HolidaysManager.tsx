import { Trash2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Button, EmptyState, ErrorMessage, Spinner, TextField } from '@/components/ui'
import { useAddHoliday, useHolidays, useRemoveHoliday } from '../hooks/useAdmin'
import { AdminCard } from './AdminCard'

const longDate = (iso: string) =>
  new Intl.DateTimeFormat(undefined, { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(`${iso}T00:00:00Z`),
  )

export function HolidaysManager() {
  const { data: holidays, isPending, error } = useHolidays()
  const add = useAddHoliday()
  const remove = useRemoveHoliday()
  const [date, setDate] = useState('')
  const [reason, setReason] = useState('')

  const onAdd = (e: FormEvent) => {
    e.preventDefault()
    add.mutate({ date, reason: reason.trim() || null }, { onSuccess: () => { setDate(''); setReason('') } })
  }

  return (
    <AdminCard title="Holidays" description="No slots are offered on these clinic dates. Existing bookings are not cancelled.">
      <form onSubmit={onAdd} className="grid items-end gap-3 sm:grid-cols-[10rem_1fr_auto]">
        <TextField label="Date" type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
        <TextField label="Reason (optional)" maxLength={200} value={reason} onChange={(e) => setReason(e.target.value)} />
        <Button type="submit" disabled={add.isPending || !date}>Add holiday</Button>
      </form>
      {add.error && <div className="mt-3"><ErrorMessage>{add.error.message}</ErrorMessage></div>}

      <div className="mt-6">
        {isPending && <Spinner />}
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
        {holidays?.length === 0 && <EmptyState>No upcoming holidays.</EmptyState>}
        <ul className="divide-y divide-line">
          {holidays?.map((h) => (
            <li key={h.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
              <span>
                <span className="font-medium">{longDate(h.date)}</span>
                {h.reason && <span className="text-muted"> · {h.reason}</span>}
              </span>
              <Button
                size="sm"
                variant="ghost"
                aria-label={`Remove holiday on ${longDate(h.date)}`}
                disabled={remove.isPending}
                onClick={() => remove.mutate(h.id)}
                icon={<Trash2 className="size-4" aria-hidden />}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </AdminCard>
  )
}
