import { PageContainer } from '@/app/components/PageContainer'
import ReactMarkdown from 'react-markdown'

const content = `
## About

Enterprise UX Patterns is a practical reference for designing and building complex, data-dense enterprise interfaces.

The patterns documented here are based on real constraints—scale, performance, legacy systems, and long-lived workflows—not idealized consumer UX.

Each pattern focuses on behavior, trade-offs, and implementation details. These are not prescriptions or universal rules, but starting points for teams that already understand that good UX is situational.`

export default function AboutPage() {
  return (
    <PageContainer>
      <div className="max-w-prose px-4 markdown-content overflow-auto">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </PageContainer>
  )
}
