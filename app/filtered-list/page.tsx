'use client'

import { FilteredList } from '../components/FilteredList'
import { PageContainer } from '../components/PageContainer'
import { generateServerLogs } from '../mock-data/server-logs'
import type { ServerLog } from '../mock-data/server-logs'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import ReactMarkdown from 'react-markdown'
import { DemoLabel } from '../components/Label'

function getItemTypeColor(type: string) {
  switch (type) {
    case 'error':
    case 'critical':
      return 'text-red-600'
    case 'warning':
      return 'text-yellow-600'
    case 'info':
      return 'text-blue-600'
    case 'debug':
      return 'text-gray-600'
    default:
      return 'text-gray-600'
  }
}

export default function FilteredListPage() {
  const [searchText, setSearchText] = useState('')
  const [allRows] = useState<ServerLog[]>(() =>
    generateServerLogs(1000)
  )
  const { data: filteredRows = [] } = useQuery({
    queryKey: ['filteredLogs', searchText],
    queryFn: () => {
      return allRows.filter((log: ServerLog) => {
        const search = searchText.toLowerCase()
        return (
          log.description.toLowerCase().includes(search) ||
          log.type.toLowerCase().includes(search) ||
          Object.values(log.data).some((value) =>
            String(value).toLowerCase().includes(search)
          )
        )
      })
    },
    staleTime: Infinity // Client-side filtering, no need to refetch
  })
  const resultCap = 100
  const visibleRows = filteredRows.slice(0, resultCap)
  const numberOfRows = visibleRows.length
  const numberOfAllRows = filteredRows.length
  const resultsSummary = (
    <div className="text-xs text-gray-600 italic">
      Showing <b>{numberOfRows}</b> of{' '}
      <b>{numberOfAllRows}</b> matching results
    </div>
  )
  const handleItemSelect = (item: unknown) => {
    console.log('Selected item:', item)
  }
  const pageTitle = 'Filtered List'
  const searchExamples = (
    <div className="text-sm text-gray-500 mb-2">
      Try searching:{' '}
      {['timeout', 'upload', 'req_', 'ssl'].map((term) => (
        <span
          key={term}
          className="font-medium text-gray-600"
        >
          &quot;{term}&quot;{' '}
        </span>
      ))}
    </div>
  )
  const descriptionMarkdown = `
## ${pageTitle}

*Most enterprise UIs don’t need virtual scrolling — they need better filtering.*

In data-heavy systems (logs, users, transactions, audits), users rarely read thousands of rows. They’re searching for something specific. A search-first interface reflects that reality: narrow the dataset first, then explore what remains.

Instead of rendering massive lists and compensating with virtualization, this pattern **filters aggressively and caps visible results**.

The result is a workflow that matches how these tools are actually used: **find first, explore second**.

### Subtle but important

- **Capped result sets** (e.g., top 100 matches) prevent performance degradation and cognitive overload.
- **Predictable rendering** keeps the interface stable as users refine queries and inspect results.
- **Variable-height, structured entries** expand naturally without requiring complex virtualization logic.
  `
  const description = (
    <div className="max-w-prose px-4 markdown-content overflow-auto">
      <ReactMarkdown>{descriptionMarkdown}</ReactMarkdown>
    </div>
  )

  return (
    <PageContainer>
      <div className="flex min-h-0 h-full">
        {description}
        <div className="border-r border-gray-200" />
        <div className="flex flex-col p-4 flex-1 bg-gray-50 min-h-0 h-full min-w-0">
          <DemoLabel>Demo</DemoLabel>
          <div className="flex flex-col min-h-0 h-full p-4 bg-white rounded shadow border border-gray-200 resize overflow-auto max-w-full">
            {searchExamples}
            <FilteredList
              placeholder="Search logs..."
              rows={visibleRows}
              searchText={searchText}
              onSearchTextChange={setSearchText}
              onItemSelect={handleItemSelect}
              getKey={(item: ServerLog) => item.timestamp}
              renderItem={(item: ServerLog) => {
                return (
                  <div>
                    <div className="text-sm font-medium">
                      <span
                        className={getItemTypeColor(
                          item.type
                        )}
                      >
                        [{item.type}]
                      </span>{' '}
                      <span className="font-bold">
                        {item.description}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(
                        item.timestamp
                      ).toLocaleString()}
                    </div>
                    <ul className="font-mono bg-gray-100 p-2 mt-2 rounded text-xs space-y-1">
                      {Object.keys(item.data).map((k) => (
                        <li key={k}>
                          <span className="text-purple-600">
                            {k}
                          </span>
                          :{' '}
                          <span className="text-green-800">
                            {String(item.data[k])}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              }}
              resultsSummary={resultsSummary}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
