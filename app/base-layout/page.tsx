import { PageContainer } from '../components/PageContainer'
import { DemoLabel } from '../components/Label'
import { LoremIpsum } from '../components/LoremIpsum'
import { FlexContainer as Container } from '../components/FlexContainer'
import { DemoDescription } from '../components/DemoDescription'

function PanelTitle({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <h3 className="text-sm font-semibold">{children}</h3>
  )
}

function Sidebar() {
  return (
    <Container className="p-4 shrink-0 w-32">
      <PanelTitle>Sidebar</PanelTitle>
    </Container>
  )
}

function PrimaryContent() {
  return (
    <Container className="p-4">
      <Container className="flex flex-col">
        <Container className="overflow-auto border border-gray-200 mb-4 p-4 rounded">
          <PanelTitle>Main Content - Scrollable</PanelTitle>
          <div className="markdown-content mt-2">
            <p>
              This is a scrollable primary content area.
            </p>
            <LoremIpsum paragraphs={4} />
          </div>
        </Container>
        <Container className="flex h-48!">
          <Container className="flex-1 mr-2 p-4 bg-gray-50 border border-gray-200 rounded">
            <PanelTitle>Content Panel 1</PanelTitle>
          </Container>
          <Container className="flex-1 ml-2 p-4 bg-gray-50 border border-gray-200 rounded">
            <PanelTitle>Content Panel 2</PanelTitle>
          </Container>
        </Container>
      </Container>
    </Container>
  )
}

const descriptionText = `
*Most enterprise applications start with a simple layout. Over time, features get added, panels multiply, and scrolling behavior becomes inconsistent and hard to reason about.*

This pattern demonstrates a basic but intentional layout structure with a header, sidebar, and a single, well-defined scrollable content area.

The goal isn’t visual polish — it’s establishing clear layout and scroll boundaries early, so the interface doesn’t collapse under its own complexity later.

### Subtle but important

- **Explicit scroll ownership**
Only the primary content area scrolls. This avoids competing scroll regions and makes it clear where users should focus.

- **Full-height layout by default**
The layout always fills the viewport height. This ensures consistent scroll behavior, predictable panel sizing, and prevents content from collapsing or reflowing as pages change.

- **Stable layout regions**
The header and sidebar remain structurally fixed, reducing layout shifts as content changes.

- **Predictable composition**
Content panels stack and expand within a known container, preventing ad hoc overflow and layout hacks as features evolve.

- **Responsive by structure, not breakpoints**
The layout adapts by rearranging regions, not by layering conditional styles on top of an unstable foundation.
`

const description = (
  <DemoDescription title="Base Layout">
    {descriptionText}
  </DemoDescription>
)

export default function AdaptiveLayoutPage() {
  return (
    <PageContainer>
      <Container className="flex">
        {description}
        <div className="border-r border-gray-200" />
        <Container className="flex flex-1 flex-col p-4 bg-gray-50">
          <DemoLabel>Demo</DemoLabel>
          <Container className="flex flex-col bg-white rounded shadow border border-gray-200 resize overflow-auto max-w-full">
            <div>
              <header className="p-4 border-b border-gray-200">
                <PanelTitle>Header</PanelTitle>
              </header>
            </div>
            <Container className="flex">
              <Sidebar />
              <Container className="border-r border-gray-200" />
              <PrimaryContent />
            </Container>
          </Container>
        </Container>
      </Container>
    </PageContainer>
  )
}
