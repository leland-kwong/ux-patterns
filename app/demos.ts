import { manifest as baseLayoutManifest } from './(demo)/base-layout/manifest'
import { manifest as buttonManagementManifest } from './(demo)/button-management/manifest'
import { manifest as filteredListManifest } from './(demo)/filtered-list/manifest'
import { manifest as intentDrivenDataManifest } from './(demo)/intent-driven-data/manifest'

export type { DemoManifest } from './(demo)/types'

export const demos = [
  baseLayoutManifest,
  buttonManagementManifest,
  filteredListManifest,
  intentDrivenDataManifest
]

// Maintain backward compatibility with old 'links' export
export const links = demos
