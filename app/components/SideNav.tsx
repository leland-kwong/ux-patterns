'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { links } from '@/app/demos'
import { useFilterKeys } from './DemoFilters'
import { useMemo } from 'react'

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
  const searchParams = useSearchParams()

  const isActive = exactMatch
    ? pathname === href
    : pathname === href || pathname.startsWith(href + '/')

  // Preserve current search params when navigating
  // Manually build query string to avoid URL encoding
  const linkHref = useMemo(() => {
    const params: string[] = []
    searchParams.forEach((value, key) => {
      params.push(`${key}=${value}`)
    })
    const queryString = params.join('&')
    return queryString ? `${href}?${queryString}` : href
  }, [href, searchParams])

  return (
    <Link
      href={linkHref}
      className={`${className} ${isActive ? activeClassName : inactiveClassName}`}
    >
      {children}
    </Link>
  )
}

function NoMatchesFound() {
  return (
    <div>
      <h4 className="font-bold mb-2">
        No matching patterns
      </h4>
      <p className="text-gray-500 italic">
        These issues rarely map to a single pattern.
      </p>
    </div>
  )
}

export function SideNav() {
  const [selectedFilterKeys] = useFilterKeys()
  const filteredLinks = links.filter(
    (link) =>
      selectedFilterKeys.length === 0 ||
      selectedFilterKeys.every((key) =>
        link.tags.includes(key)
      )
  )
  const noLinksFound = filteredLinks.length === 0

  return (
    <ul className="w-48 p-4 text-sm space-y-2">
      {noLinksFound && (
        <li>
          <NoMatchesFound />
        </li>
      )}
      {filteredLinks.map((link) => (
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
