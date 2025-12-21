export const FilterChoices = {
  find_things: "Users can't find things",
  scroll_broken: 'Scrolling feels broken',
  ui_clutter: 'Too much is on screen',
  layout_foundation: 'Layout feels off',
  ui_complexity: 'UI keeps getting heavier'
} as const

export type FilterChoiceKey = keyof typeof FilterChoices
export type FilterChoice =
  (typeof FilterChoices)[keyof typeof FilterChoices]

export const filterChoices = Object.values(FilterChoices)
export const filterChoiceKeys = Object.keys(
  FilterChoices
) as FilterChoiceKey[]

export function getFilterChoiceLabel(
  key: FilterChoiceKey
): FilterChoice {
  return FilterChoices[key]
}
