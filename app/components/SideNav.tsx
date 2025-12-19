'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface SideNavLinkProps {
  href: string
  children: React.ReactNode
  exactMatch?: boolean
  className?: string
  activeClassName?: string
  inactiveClassName?: string
}

function SideNavLink({
  href,
  children,
  exactMatch = false,
  className = '',
  activeClassName = '',
  inactiveClassName = ''
}: SideNavLinkProps) {
  const pathname = usePathname()

  const isActive = exactMatch
    ? pathname === href
    : pathname === href || pathname.startsWith(href + '/')

  return (
    <Link
      href={href}
      className={`${className} ${isActive ? activeClassName : inactiveClassName}`}
    >
      {children}
    </Link>
  )
}

const links = [
  { href: '/base-layout', label: 'Base Layout' },
  { href: '/filtered-list', label: 'Filtered List' }
]

export function SideNav() {
  return (
    <ul className="w-48 p-4 text-sm space-y-2">
      {links.map((link) => (
        <li key={link.href}>
          <SideNavLink
            href={link.href}
            className="border-l pl-4 py-1 hover:border-gray-400"
            inactiveClassName="border-gray-300"
            activeClassName="border-black font-bold"
          >
            {link.label}
          </SideNavLink>
        </li>
      ))}
    </ul>
  )
}
