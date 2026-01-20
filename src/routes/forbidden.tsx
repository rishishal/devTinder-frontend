import { createFileRoute } from '@tanstack/react-router'
import { ForbiddenError } from '@/app/error/index'

export const Route = createFileRoute('/forbidden')({
  component: ForbiddenError,
})


