import { createFileRoute } from '@tanstack/react-router'

import TokenSaverDocs from '@/features/custom-page/components/TokenSaverDocsPage'

export const Route = createFileRoute('/_custom/token-saver-docs')({
  component: TokenSaverDocs,
})
