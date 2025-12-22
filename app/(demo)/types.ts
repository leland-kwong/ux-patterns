import type { FilterChoiceKey } from '@/app/components/DemoFilters/filterChoices'

export interface DemoManifest {
  href: string
  label: string
  thesis: string
  tags: FilterChoiceKey[]
}
