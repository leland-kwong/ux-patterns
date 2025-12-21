import { PageContainer } from '../components/PageContainer'
import { FlexContainer } from '../components/FlexContainer'
import { DemoLabel } from '../components/Label'
import { DemoDescription } from '../components/DemoDescription'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'

const descriptionText = `
*Button explosion is a common issue in complex applications. As features are added, buttons tend to multiply, leading to cluttered interfaces and user confusion.*

This pattern focuses on managing button proliferation through thoughtful grouping, prioritization, and contextual display. By organizing buttons into logical clusters and using progressive disclosure techniques, we can maintain a clean interface while still providing access to necessary actions.

Grouping alone reduces visual noise, but it does not resolve prioritization. Under real constraints, interfaces are forced to make decisions the team avoided.
`
const description = (
  <DemoDescription title="Button Management">
    {descriptionText}
  </DemoDescription>
)

function ButtonExplosionExample() {
  return (
    <div className="p-4">
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Ungrouped</h4>
          <div className="flex gap-2 flex-wrap">
            <Button>Save</Button>
            <Button variant="destructive">Delete</Button>
            <Button variant="outline">Export</Button>
            <Button variant="outline">Archive</Button>
            <Button variant="outline">Approve</Button>
            <Button variant="outline">
              Send for Review
            </Button>
            <Button variant="outline">
              Download Report
            </Button>
            <Button variant="outline">Reject</Button>
            <Button variant="outline">Assign Task</Button>
            <Button variant="outline">
              Generate Invoice
            </Button>
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-2">
            Semantically Grouped
          </h4>
          <div className="flex gap-2 gap-x-4 flex-wrap">
            <ButtonGroup>
              <Button>Save</Button>
              <Button variant="destructive">Delete</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="outline">Export</Button>
              <Button variant="outline">Archive</Button>
              <Button variant="outline">
                Download Report
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="outline">Approve</Button>
              <Button variant="outline">
                Send for Review
              </Button>
              <Button variant="outline">Reject</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="outline">Assign Task</Button>
              <Button variant="outline">
                Generate Invoice
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-2">
            Priority + Progressive Disclosure
          </h4>
          <div className="flex gap-2 gap-x-4 flex-wrap">
            <ButtonGroup>
              <Button>Save</Button>
              <Button variant="destructive">Delete</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button
                variant="outline"
                className="rounded-r-none"
              >
                Export
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-l-none -ml-px"
                  >
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>
                    Archive
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Download Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="outline">Approve</Button>
              <Button variant="outline">Reject</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-l-none -ml-px"
                  >
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>
                    Send for Review
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Assign Task
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Generate Invoice
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ButtonManagementPage() {
  return (
    <PageContainer>
      <FlexContainer className="flex">
        {description}
        <div className="border-r border-gray-200" />
        <FlexContainer className="flex flex-1 flex-col p-4 bg-gray-50">
          <DemoLabel>Demo</DemoLabel>
          <FlexContainer className="flex bg-white rounded shadow border border-gray-200 resize overflow-auto max-w-full h-auto!">
            <ButtonExplosionExample />
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </PageContainer>
  )
}
