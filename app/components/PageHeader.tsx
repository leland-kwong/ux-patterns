import Link from 'next/link'
import { LogoIcon } from './LogoIcon'
import { APP_CONFIG } from '../config'
import { FaGithub } from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/24/solid'

export function PageHeader() {
  return (
    <header className="px-4 py-4 border-b border-gray-300 flex align-center justify-between">
      <h1 className="text-base font-bold">
        <Link
          href="/"
          className="hover:underline flex items-center gap-2"
        >
          <LogoIcon className="w-5 h-5" />
          <span>{APP_CONFIG.title}</span>
        </Link>
      </h1>
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
