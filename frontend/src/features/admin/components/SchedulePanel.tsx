import { useClinicSettings } from '../hooks/useAdmin'
import { BookingSettingsForm } from './BookingSettingsForm'
import { HolidaysManager } from './HolidaysManager'
import { WeeklyHoursEditor } from './WeeklyHoursEditor'

export function SchedulePanel() {
  const { data: settings } = useClinicSettings()
  return (
    <div className="space-y-6">
      <WeeklyHoursEditor clinicTimeZone={settings?.timezone} />
      <HolidaysManager />
      <BookingSettingsForm />
    </div>
  )
}
