import Link from 'next/link'
import { PageContainer } from './components/PageContainer'

export default function Home() {
  return (
    <PageContainer>
      <ul className="p-4">
        <li>
          <Link
            href="/filtered-list"
            className="hover:underline text-blue-600"
          >
            Filtered List
          </Link>
        </li>
      </ul>
    </PageContainer>
  )
}
