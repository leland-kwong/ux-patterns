import type { FilterChoiceKey } from '@/app/components/DemoFilters/filterChoices'

export const links: {
  href: string
  label: string
  tags: FilterChoiceKey[]
}[] = [
  {
    href: '/base-layout',
    label: 'Base Layout',
    tags: ['scroll_broken', 'layout_foundation']
  },
  {
    href: '/button-management',
    label: 'Button Management',
    tags: ['ui_clutter', 'ui_complexity']
  },
  {
    href: '/filtered-list',
    label: 'Filtered List',
    tags: ['find_things']
  }
]
