import { redirect } from 'next/navigation'
import { links } from '@/app/demos'

export default function Home() {
  redirect(links[0].href)
}
