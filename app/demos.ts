import { manifest as baseLayoutManifest } from './(demo)/base-layout/manifest'
import { manifest as buttonManagementManifest } from './(demo)/button-management/manifest'
import { manifest as filteredListManifest } from './(demo)/filtered-list/manifest'

export type { DemoManifest } from './(demo)/types'

export const demos = [
  baseLayoutManifest,
  buttonManagementManifest,
  filteredListManifest
]

// Maintain backward compatibility with old 'links' export
export const links = demos
