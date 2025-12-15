import { PageHeader } from './PageHeader'
import Link from 'next/link'

function SideNav() {
  return (
    <ul className="w-32 p-4">
      <li>
        <Link
          href="/filtered-list"
          className="font-bold hover:underline"
        >
          Filtered List
        </Link>
      </li>
    </ul>
  )
}

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
      <div className="flex min-h-0 h-full">
        <div className="h-full border-r border-gray-300 bg-gray-50">
          <SideNav />
        </div>
        <div className="flex-1 h-full">{children}</div>
      </div>
    </main>
  )
}
