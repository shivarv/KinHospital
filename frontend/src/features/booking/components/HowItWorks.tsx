import { CalendarDays, FileText, Leaf, Mail, Video } from 'lucide-react'

const STEPS = [
  { icon: CalendarDays, title: 'Book', text: 'Fill in your details and pick a time that suits you.' },
  { icon: Mail, title: 'Confirm', text: 'We email you to confirm your appointment.' },
  { icon: Video, title: 'Consult', text: 'Meet your practitioner online at your booked time.' },
  { icon: FileText, title: 'Get your plan', text: 'Receive guidance made for your health goals.' },
  { icon: Leaf, title: 'Continue', text: 'Follow-ups and ongoing support when you need them.' },
]

export function HowItWorks() {
  return (
    <ol className="grid gap-8 sm:grid-cols-3 lg:grid-cols-5">
      {STEPS.map(({ icon: Icon, title, text }, i) => (
        <li key={title} className="relative text-center">
          {i < STEPS.length - 1 && (
            <span className="absolute left-[calc(50%+2.25rem)] top-7 hidden h-px w-[calc(100%-4.5rem)] bg-sage-300 lg:block" aria-hidden />
          )}
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-sage-200">
            <Icon className="size-5 text-forest-700" strokeWidth={1.5} aria-hidden />
          </span>
          <h3 className="mt-4 text-lg">
            <span className="text-muted">{i + 1}. </span>
            {title}
          </h3>
          <p className="mx-auto mt-1.5 max-w-48 text-sm leading-relaxed text-muted">{text}</p>
        </li>
      ))}
    </ol>
  )
}
