import type { Page, PageProps, Errors, ErrorBag } from '@inertiajs/inertia'
import type { UserInterface } from './interfaces/user'

declare global {
  interface InertiaPage extends Page<PageProps> {
    props: {
      errors: Errors & ErrorBag
      success: string
      user: UserInterface
    }
  }
}
