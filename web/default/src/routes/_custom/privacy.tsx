import { createFileRoute } from '@tanstack/react-router'

import Privacy from '@/features/custom-page/components/PrivacyPolicyPage'

export const Route = createFileRoute('/_custom/privacy')({
  component: Privacy,
})


