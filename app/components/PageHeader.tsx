import Link from 'next/link'
import { LogoIcon } from './LogoIcon'
import { APP_CONFIG } from '../config'

export function PageHeader() {
  return (
    <header className="px-4 py-4 border-b border-gray-300">
      <h1 className="text-base font-bold">
        <Link
          href="/"
          className="hover:underline flex items-center gap-2"
        >
          <LogoIcon className="w-5 h-5" />
          <span>{APP_CONFIG.title}</span>
        </Link>
      </h1>
    </header>
  )
}
