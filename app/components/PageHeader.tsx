import Link from 'next/link'
import { LogoIcon } from './LogoIcon'
import { APP_CONFIG } from '../config'
import { FaGithub } from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/24/solid'
import { DemoFilters } from './DemoFilters'

export function PageHeader() {
  return (
    <header className="px-4 py-4 border-b border-gray-300 flex align-center justify-between">
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="hover:underline flex items-center gap-2"
        >
          <LogoIcon className="w-5 h-5" />
          <span className="text-base font-bold">
            {APP_CONFIG.title}
          </span>
        </Link>
        <div>
          <DemoFilters />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1 items-center">
        <Link
          href="https://github.com/leland-kwong/ux-patterns"
          className="text-xl hover:underline"
        >
          <FaGithub />
        </Link>
        <Link href="/about">
          <InformationCircleIcon className="size-6" />
        </Link>
      </div>
    </header>
  )
}
