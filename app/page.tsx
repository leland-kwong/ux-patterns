import { redirect } from 'next/navigation'
import { links } from './navigation-links'

export default function Home() {
  redirect(links[0].href)
}
