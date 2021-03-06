import { getOhbugObject } from '@ohbug/utils'
import type { OhbugBaseDetail } from '@ohbug/types'

import * as types from '../types'

const { UNHANDLEDREJECTION_ERROR } = types

export interface UnhandledrejectionErrorDetail extends OhbugBaseDetail {
  stack: string
}

export function unhandledrejectionErrorHandler(error: PromiseRejectionEvent) {
  const detail: UnhandledrejectionErrorDetail = {
    message: error.reason.message || error.reason,
    stack: error.reason.stack,
  }
  const { client } = getOhbugObject<Window>()
  const event = client.createEvent<UnhandledrejectionErrorDetail>({
    category: 'error',
    type: UNHANDLEDREJECTION_ERROR,
    detail,
  })
  client.notify(event)
}
