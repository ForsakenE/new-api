import { createFileRoute } from '@tanstack/react-router'

import Privacy from '@/features/custom-page/components/UserTermsPage'

export const Route = createFileRoute('/_custom/terms')({
  component: Privacy,
})

