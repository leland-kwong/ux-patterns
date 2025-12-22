'use client'

import ReactMarkdown from 'react-markdown'
import { getFilterChoiceLabel } from './DemoFilters/filterChoices'
import { usePathname } from 'next/navigation'
import { links } from '@/app/demos'

export function DemoDescription({
  title,
  children
}: {
  title: string
  children: string
}) {
  const pathName = usePathname()
  const issuesAddressed =
    links
      .find((l) => l.href === pathName)
      ?.tags.map(getFilterChoiceLabel) || []

  return (
    <div className="max-w-prose p-4 overflow-auto">
      <div className="mb-4">
        <h2 className="text-3xl font-bold mb-0">{title}</h2>
        <div className="text-sm text-gray-600 mt-1">
          <strong>Issues Addressed:</strong>{' '}
          {issuesAddressed.join(' · ')}
        </div>
      </div>
      <div className="markdown-content">
        <ReactMarkdown>{children}</ReactMarkdown>
      </div>
    </div>
  )
}
