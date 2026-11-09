import { Bone, Leaf, Moon, Scale, ShieldPlus, Soup, Sparkles, Venus, type LucideIcon } from 'lucide-react'

/** Slugs must match backend `app/core/constants.py::CareArea`. */
export type CareAreaSlug =
  | 'weight-metabolism'
  | 'womens-health'
  | 'digestive-wellness'
  | 'stress-sleep'
  | 'pain-mobility'
  | 'skin-hair'
  | 'preventive-wellness'
  | 'healthy-ageing'

export interface CareArea {
  slug: CareAreaSlug
  title: string
  summary: string
  details: string[]
  icon: LucideIcon
  /** Full Tailwind class strings (kept literal so Tailwind can see them). */
  tint: { surface: string; ink: string; chip: string }
}

export const CARE_AREAS: CareArea[] = [
  {
    slug: 'weight-metabolism',
    title: 'Weight & Metabolism',
    summary: 'Support for healthy weight, insulin balance and metabolic health.',
    details: ['Weight management', 'Insulin resistance', 'Pre-diabetes and type 2 diabetes', 'Metabolic syndrome'],
    icon: Scale,
    tint: { surface: 'bg-care-green', ink: 'text-care-green-ink', chip: 'bg-care-green-ink' },
  },
  {
    slug: 'womens-health',
    title: "Women's Health",
    summary: 'PCOS, PCOD, fertility, menstrual health and hormonal balance.',
    details: ['PCOS / PCOD', 'Fertility and preconception care', 'Pregnancy and postpartum support', 'Perimenopause and menopause'],
    icon: Venus,
    tint: { surface: 'bg-care-rose', ink: 'text-care-rose-ink', chip: 'bg-care-rose-ink' },
  },
  {
    slug: 'digestive-wellness',
    title: 'Digestive Wellness',
    summary: 'Relief from bloating, acidity, constipation, IBS and other gut concerns.',
    details: ['Bloating and gas', 'Acidity', 'Constipation', 'IBS and gut health'],
    icon: Soup,
    tint: { surface: 'bg-care-sand', ink: 'text-care-sand-ink', chip: 'bg-care-sand-ink' },
  },
  {
    slug: 'stress-sleep',
    title: 'Stress & Sleep',
    summary: 'A calmer mind, better sleep and steadier emotional wellbeing.',
    details: ['Stress and anxiety', 'Sleep problems', 'Burnout', 'Focus and concentration'],
    icon: Moon,
    tint: { surface: 'bg-care-mist', ink: 'text-care-mist-ink', chip: 'bg-care-mist-ink' },
  },
  {
    slug: 'pain-mobility',
    title: 'Pain & Mobility',
    summary: 'Help with back, joint and muscle pain and lifestyle-related stiffness.',
    details: ['Back and neck pain', 'Joint pain', 'Arthritis and stiffness', 'Posture and mobility'],
    icon: Bone,
    tint: { surface: 'bg-care-peach', ink: 'text-care-peach-ink', chip: 'bg-care-peach-ink' },
  },
  {
    slug: 'skin-hair',
    title: 'Skin & Hair',
    summary: 'Healthier skin and stronger hair, naturally.',
    details: ['Acne and scars', 'Pigmentation', 'Eczema and sensitive skin', 'Hair fall and dandruff'],
    icon: Sparkles,
    tint: { surface: 'bg-care-mint', ink: 'text-care-mint-ink', chip: 'bg-care-mint-ink' },
  },
  {
    slug: 'preventive-wellness',
    title: 'Preventive Wellness',
    summary: 'Lifestyle, nutrition and immunity support to stay well.',
    details: ['Lifestyle improvement', 'Immunity support', 'Nutrition optimisation', 'Seasonal care'],
    icon: ShieldPlus,
    tint: { surface: 'bg-care-lilac', ink: 'text-care-lilac-ink', chip: 'bg-care-lilac-ink' },
  },
  {
    slug: 'healthy-ageing',
    title: 'Healthy Ageing',
    summary: 'Long-term vitality, bone and heart health, and cognitive function.',
    details: ['Bone and joint health', 'Heart and metabolic health', 'Cognitive health', 'Energy and vitality'],
    icon: Leaf,
    tint: { surface: 'bg-care-butter', ink: 'text-care-butter-ink', chip: 'bg-care-butter-ink' },
  },
]

export function findCareArea(slug: string | null | undefined): CareArea | undefined {
  return CARE_AREAS.find((a) => a.slug === slug)
}
