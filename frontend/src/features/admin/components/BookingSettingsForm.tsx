import { useMemo, useState, type FormEvent } from 'react'
import { Button, ErrorMessage, SelectField, Spinner, TextField } from '@/components/ui'
import { useClinicSettings, useUpdateClinicSettings } from '../hooks/useAdmin'
import type { ClinicSettings } from '../types'
import { AdminCard } from './AdminCard'

export function BookingSettingsForm() {
  const { data, isPending, error } = useClinicSettings()
  return (
    <AdminCard title="Booking settings" description="Applies to new bookings. Changing slot length doesn't move existing appointments.">
      {isPending && <Spinner />}
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      {data && <SettingsForm initial={data} />}
    </AdminCard>
  )
}

function SettingsForm({ initial }: { initial: ClinicSettings }) {
  const save = useUpdateClinicSettings()
  const [form, setForm] = useState(initial)
  const [saved, setSaved] = useState(false)
  const zones = useMemo(
    () =>
      (typeof Intl.supportedValuesOf === 'function' ? Intl.supportedValuesOf('timeZone') : ['UTC']).map((z) => ({
        value: z,
        label: z,
      })),
    [],
  )

  const set = <K extends keyof ClinicSettings>(key: K, value: ClinicSettings[K]) => {
    setSaved(false)
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    save.mutate(form, { onSuccess: () => setSaved(true) })
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <SelectField label="Clinic time zone" value={form.timezone} onChange={(e) => set('timezone', e.target.value)} options={zones} />
      <TextField
        label="Slot length (minutes)"
        type="number"
        min={10}
        max={180}
        required
        value={form.slot_minutes}
        onChange={(e) => set('slot_minutes', Number(e.target.value))}
      />
      <TextField
        label="Book up to (days ahead)"
        type="number"
        min={1}
        max={365}
        required
        value={form.booking_window_days}
        onChange={(e) => set('booking_window_days', Number(e.target.value))}
      />
      <TextField
        label="Minimum notice (minutes)"
        type="number"
        min={0}
        required
        value={form.min_notice_minutes}
        onChange={(e) => set('min_notice_minutes', Number(e.target.value))}
      />
      <TextField
        label="Consultation fee"
        type="number"
        min={0}
        step="0.01"
        required
        value={form.consultation_fee}
        onChange={(e) => set('consultation_fee', e.target.value)}
      />
      <TextField
        label="Currency"
        required
        minLength={3}
        maxLength={3}
        value={form.currency}
        onChange={(e) => set('currency', e.target.value.toUpperCase())}
      />
      <div className="sm:col-span-2">
        <TextField
          label="Duration shown to patients"
          required
          maxLength={80}
          value={form.consultation_duration_label}
          onChange={(e) => set('consultation_duration_label', e.target.value)}
        />
      </div>
      <div className="flex items-center gap-4 sm:col-span-2">
        <Button type="submit" disabled={save.isPending}>{save.isPending ? 'Saving…' : 'Save settings'}</Button>
        {saved && <span role="status" className="text-sm text-forest-700">Settings saved</span>}
      </div>
      {save.error && <div className="sm:col-span-2"><ErrorMessage>{save.error.message}</ErrorMessage></div>}
    </form>
  )
}
