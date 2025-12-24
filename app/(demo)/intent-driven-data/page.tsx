'use client'

import { Button } from '@/components/ui/button'
import { PageContainer } from '@/app/components/PageContainer'
import { FlexContainer } from '@/app/components/FlexContainer'
import { DemoDescription } from '@/app/components/DemoDescription'
import { DemoLabel } from '@/app/components/Label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  RadioGroup,
  RadioGroupItem
} from '@/components/ui/radio-group'
import { Telescope as IntentViewIcon } from 'lucide-react'
import { atom, useAtom } from 'jotai'
import { useState } from 'react'
import { manifest } from './manifest'

type MetricData = { [key: string]: string }

const mockMetricsData: MetricData = {
  totalSales: '$25000',
  newCustomers: '150',
  conversionRate: '3.5%',
  customerSatisfaction: '85%',
  websiteTraffic: '12000 visits',
  averageOrderValue: '$75',
  churnRate: '5%',
  serviceUptime: '99.9%',
  errorRate: '0.2%',
  responseTime: '250 ms',
  throughput: '1000 req/s',
  cpuUsage: '65%',
  memoryUsage: '4 / 16 GB',
  diskIO: '120 MB/s',
  networkLatency: '50 ms'
}

const INTENT_VIEW_MAP: {
  [key: string]: number
} = {
  REVENUE_HEALTH: 1,
  CUSTOMER_GROWTH: 2,
  RETENTION_SATISFACTION: 3,
  SYSTEM_RELIABILITY: 4,
  SYSTEM_PERFORMANCE: 5,
  CAPACITY_LIMITS: 6
}

const INTENT_VIEW_CHOICES: IntentViewChoiceGroup[] = [
  {
    label: 'Business Intent',
    choices: [
      {
        label: 'Revenue Health',
        value: INTENT_VIEW_MAP.REVENUE_HEALTH
      },
      {
        label: 'Customer Growth',
        value: INTENT_VIEW_MAP.CUSTOMER_GROWTH
      },
      {
        label: 'Retention & Satisfaction',
        value: INTENT_VIEW_MAP.RETENTION_SATISFACTION
      }
    ]
  },
  {
    label: 'System Intent',
    choices: [
      {
        label: 'Reliability',
        value: INTENT_VIEW_MAP.SYSTEM_RELIABILITY
      },
      {
        label: 'Performance',
        value: INTENT_VIEW_MAP.SYSTEM_PERFORMANCE
      },
      {
        label: 'Capacity & Scaling',
        value: INTENT_VIEW_MAP.CAPACITY_LIMITS
      }
    ]
  }
]

// Atom to store the selected intent view
const selectedIntentViewAtom = atom<string | undefined>(
  INTENT_VIEW_CHOICES[0].choices[0].value.toString()
)

const descriptionText = `
*${manifest.thesis}*

This pattern demonstrates an intent-driven data dashboard that focuses on answering specific questions rather than overwhelming users with all available data.

## The Problem

When a single screen tries to support:

- growth analysis
- revenue review
- system monitoring
- performance debugging

…it stops being a decision tool and becomes a data dump.

Nothing is technically wrong —
but nothing is clearly actionable either.

---

## The Approach

Instead of asking *“What data should we show?”*
this interface asks:

**“What are you trying to understand right now?”**

Each intent:

- commits the interface to a single question
- surfaces only the metrics required to answer it
- explicitly refuses to represent other concerns at the same time

---

## The Tradeoff

This design intentionally limits visibility.

Not because the data is unimportant —
but because showing everything at once destroys meaning.

If you need to answer a different question, you change intent.

You don’t scan harder.
`

const description = (
  <DemoDescription title={manifest.label}>
    {descriptionText}
  </DemoDescription>
)

type IntentViewChoice = {
  label: string
  value: number
}

type IntentViewChoiceGroup = {
  label: string
  choices: IntentViewChoice[]
}

function IntentViewChoiceGroup({
  label,
  choices
}: IntentViewChoiceGroup) {
  return (
    <div>
      <h4 className="text-sm font-medium mb-2 text-gray-500">
        {label}
      </h4>
      <div className="space-y-2">
        {choices.map((choice) => (
          <div
            key={choice.value}
            className="flex items-center space-x-2"
          >
            <RadioGroupItem
              value={choice.value.toString()}
              id={`choice-${choice.value}`}
            />
            <label
              htmlFor={`choice-${choice.value}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {choice.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

function IntentViewSelector({
  choices
}: {
  choices: IntentViewChoiceGroup[]
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIntentView, setSelectedIntentView] =
    useAtom(selectedIntentViewAtom)
  const selectedIntentViewLabel = choices
    .flatMap((group) => group.choices)
    .find(
      (choice) =>
        choice.value.toString() === selectedIntentView
    )?.label

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <IntentViewIcon className="h-4 w-4" />
          Current Intent:{' '}
          <strong>
            {selectedIntentViewLabel || 'Select View'}
          </strong>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="start">
        <p className="mb-4 text-sm font-medium">
          What are you trying to understand?
        </p>
        <RadioGroup
          className="space-y-4"
          value={selectedIntentView}
          onValueChange={(value) => {
            setIsOpen(false)
            setSelectedIntentView(value)
          }}
        >
          {choices.map((choiceGroup) => (
            <IntentViewChoiceGroup
              key={choiceGroup.label}
              label={choiceGroup.label}
              choices={choiceGroup.choices}
            />
          ))}
        </RadioGroup>
      </PopoverContent>
    </Popover>
  )
}

function MetricsPanel({
  children,
  title
}: {
  children: React.ReactNode
  title: string
}) {
  return (
    <div className="flex flex-col p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-md font-medium h-12">{title}</h3>
      {children}
    </div>
  )
}

function getMetricsForIntentView(
  intentView: IntentViewChoice['value'],
  data: MetricData
) {
  switch (intentView) {
    case INTENT_VIEW_MAP.REVENUE_HEALTH:
      return {
        totalSales: data.totalSales,
        averageOrderValue: data.averageOrderValue
      }
    case INTENT_VIEW_MAP.CUSTOMER_GROWTH:
      return {
        newCustomers: data.newCustomers,
        conversionRate: data.conversionRate,
        websiteTraffic: data.websiteTraffic
      }
    case INTENT_VIEW_MAP.RETENTION_SATISFACTION:
      return {
        customerSatisfaction: data.customerSatisfaction,
        churnRate: data.churnRate
      }
    case INTENT_VIEW_MAP.SYSTEM_RELIABILITY:
      return {
        serviceUptime: data.serviceUptime,
        errorRate: data.errorRate
      }
    case INTENT_VIEW_MAP.SYSTEM_PERFORMANCE:
      return {
        responseTime: data.responseTime,
        throughput: data.throughput,
        networkLatency: data.networkLatency,
        diskIO: data.diskIO
      }
    case INTENT_VIEW_MAP.CAPACITY_LIMITS:
      return {
        cpuUsage: data.cpuUsage,
        memoryUsage: data.memoryUsage
      }
    default:
      return data
  }
}

function Dashboard() {
  const [selectedIntentView] = useAtom(
    selectedIntentViewAtom
  )
  const intentViewValue = selectedIntentView
    ? parseInt(selectedIntentView)
    : undefined
  const metricsToDisplay = getMetricsForIntentView(
    intentViewValue || INTENT_VIEW_MAP.REVENUE_HEALTH,
    mockMetricsData
  )
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {Object.entries(metricsToDisplay).map(
        ([key, value]) => (
          <MetricsPanel
            key={key}
            title={key
              .replace(/([A-Z])/g, ' $1')
              .replace(/^./, (str) => str.toUpperCase())}
          >
            <p className="text-2xl font-bold">{value}</p>
          </MetricsPanel>
        )
      )}
    </div>
  )
}

export default function Page() {
  return (
    <PageContainer>
      <FlexContainer className="flex">
        {description}
        <div className="border-r border-gray-200" />
        <FlexContainer className="flex flex-col p-4 flex-1 bg-gray-50 min-h-0 h-full min-w-0">
          <DemoLabel>Demo</DemoLabel>
          <div className="mb-4 flex">
            <IntentViewSelector
              choices={INTENT_VIEW_CHOICES}
            />
          </div>
          <div className="border-b border-gray-200" />
          <FlexContainer className="flex-1 overflow-auto">
            <Dashboard />
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </PageContainer>
  )
}
