'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { SlidersHorizontal } from 'lucide-react'
import {
  useQueryState,
  parseAsArrayOf,
  parseAsStringLiteral
} from 'nuqs'
import {
  FilterChoices,
  FilterChoice,
  FilterChoiceKey,
  filterChoices,
  filterChoiceKeys
} from './filterChoices'

export const useFilterKeys = () =>
  useQueryState(
    'issues',
    parseAsArrayOf(
      parseAsStringLiteral(filterChoiceKeys)
    ).withDefault([])
  )

export function DemoFilters() {
  const [selectedFilterKeys, setSelectedFilterKeys] =
    useFilterKeys()

  const toggleFilter = (filter: FilterChoice) => {
    const key = Object.keys(FilterChoices).find(
      (k) => FilterChoices[k as FilterChoiceKey] === filter
    ) as FilterChoiceKey

    setSelectedFilterKeys((prev) => {
      if (prev.includes(key)) {
        return prev.filter((k) => k !== key)
      } else {
        return [...prev, key]
      }
    })
  }

  const clearFilters = () => {
    setSelectedFilterKeys([])
  }

  const selectedCount = selectedFilterKeys.length
  const hasSelection = selectedCount > 0
  const isEmptySelection = selectedCount === 0

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {hasSelection && (
            <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
              {selectedCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-90" align="start">
        <div className="space-y-4">
          <div className="">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-medium text-sm">
                What&apos;s the issue?
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-auto p-1 text-xs hover:text-foreground"
                style={{
                  opacity: isEmptySelection ? 0 : 1,
                  visibility: isEmptySelection
                    ? 'hidden'
                    : 'visible'
                }}
              >
                Clear All
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">
              {isEmptySelection
                ? 'Select issues to filter patterns.'
                : 'Showing patterns that match all selected issues.'}
            </div>
          </div>
          <div className="space-y-3">
            {filterChoices.map((filter) => {
              const key = Object.keys(FilterChoices).find(
                (k) =>
                  FilterChoices[k as FilterChoiceKey] ===
                  filter
              ) as FilterChoiceKey
              const isSelected =
                selectedFilterKeys.includes(key)
              return (
                <div
                  key={filter}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={filter}
                    checked={isSelected}
                    onCheckedChange={() =>
                      toggleFilter(filter)
                    }
                  />
                  <label
                    htmlFor={filter}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {filter}
                  </label>
                </div>
              )
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
