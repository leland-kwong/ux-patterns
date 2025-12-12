import { PageHeader } from './PageHeader'

export function PageContainer({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex flex-col h-screen">
      <div className="shrink-0">
        <PageHeader />
      </div>
      <div className="flex-1 min-h-0">{children}</div>
    </main>
  )
}
