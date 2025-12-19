import { PageHeader } from './PageHeader'
import { SideNav } from './SideNav'

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
      <div className="flex min-h-0 h-full min-w-0">
        <div className="h-full border-r border-gray-300 bg-gray-50">
          <SideNav />
        </div>
        <div className="flex-1 h-full min-w-0">
          {children}
        </div>
      </div>
    </main>
  )
}
