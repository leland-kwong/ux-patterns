export type LogType =
  | 'info'
  | 'warning'
  | 'error'
  | 'debug'
  | 'critical'

export interface ServerLog {
  timestamp: string
  description: string
  type: LogType
  data: Record<string, unknown>
}

const logTypes: LogType[] = [
  'info',
  'warning',
  'error',
  'debug',
  'critical'
]

const descriptions = [
  'User authentication successful',
  'Database connection established',
  'API request timeout',
  'Cache miss for key',
  'Memory usage threshold exceeded',
  'File upload completed',
  'Background job started',
  'Payment processing failed',
  'Email notification sent',
  'Rate limit exceeded',
  'Session expired',
  'Configuration reloaded',
  'Server health check passed',
  'Webhook delivery failed',
  'Data migration completed',
  'SSL certificate renewed',
  'Backup process initiated',
  'Invalid request parameters',
  'Third-party API error',
  'Resource not found'
]

const possibleMetadataFields = {
  userId: () => `user_${Math.floor(Math.random() * 10000)}`,
  requestId: () =>
    `req_${Math.random().toString(36).substring(7)}`,
  ipAddress: () =>
    `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
  endpoint: () =>
    [
      '/api/users',
      '/api/posts',
      '/api/auth',
      '/api/payments',
      '/api/uploads'
    ][Math.floor(Math.random() * 5)],
  method: () =>
    ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'][
      Math.floor(Math.random() * 5)
    ],
  statusCode: () =>
    [200, 201, 400, 401, 403, 404, 500, 503][
      Math.floor(Math.random() * 8)
    ],
  duration: () => `${Math.floor(Math.random() * 5000)}ms`,
  bytes: () => Math.floor(Math.random() * 1000000),
  userAgent: () =>
    [
      'Mozilla/5.0',
      'Chrome/120.0',
      'Safari/17.0',
      'Edge/120.0'
    ][Math.floor(Math.random() * 4)],
  sessionId: () =>
    `sess_${Math.random().toString(36).substring(7)}`,
  errorCode: () =>
    `ERR_${Math.floor(Math.random() * 9999)}`,
  retryCount: () => Math.floor(Math.random() * 5),
  queueSize: () => Math.floor(Math.random() * 1000),
  memoryUsage: () => `${Math.floor(Math.random() * 100)}%`,
  cpuUsage: () => `${Math.floor(Math.random() * 100)}%`,
  region: () =>
    [
      'us-east-1',
      'us-west-2',
      'eu-west-1',
      'ap-southeast-1'
    ][Math.floor(Math.random() * 4)],
  instanceId: () =>
    `i-${Math.random().toString(36).substring(7)}`,
  fileName: () =>
    `file_${Math.floor(Math.random() * 1000)}.${['jpg', 'png', 'pdf', 'csv'][Math.floor(Math.random() * 4)]}`,
  fileSize: () => `${Math.floor(Math.random() * 10000)}KB`,
  cacheKey: () =>
    `cache:${Math.random().toString(36).substring(7)}`
}

function generateRandomMetadata(): Record<string, unknown> {
  const fields = Object.keys(possibleMetadataFields)
  // Random number of fields between 1 and 12 for high variance
  const fieldCount = Math.floor(Math.random() * 12) + 1
  const metadata: Record<string, unknown> = {}

  // Randomly select fields
  const shuffled = fields.sort(() => 0.5 - Math.random())
  const selected = shuffled.slice(0, fieldCount)

  selected.forEach((field) => {
    const generator =
      possibleMetadataFields[
        field as keyof typeof possibleMetadataFields
      ]
    metadata[field] = generator()
  })

  return metadata
}

function generateTimestamp(): string {
  const now = new Date()
  const randomOffset = Math.floor(Math.random() * 86400000) // Random time within last 24 hours
  const timestamp = new Date(now.getTime() - randomOffset)
  return timestamp.toISOString()
}

function generateServerLog(): ServerLog {
  return {
    timestamp: generateTimestamp(),
    description:
      descriptions[
        Math.floor(Math.random() * descriptions.length)
      ],
    type: logTypes[
      Math.floor(Math.random() * logTypes.length)
    ],
    data: generateRandomMetadata()
  }
}

// Generate array of server logs
export function generateServerLogs(
  count: number
): ServerLog[] {
  const data = Array.from({ length: count }, () =>
    generateServerLog()
  )
  data.sort(
    (a, b) =>
      new Date(b.timestamp).getTime() -
      new Date(a.timestamp).getTime()
  )
  return data
}
