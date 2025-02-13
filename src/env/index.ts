import { z } from 'zod'

const envSchema = z.object({
  MONGODB_URI_LOCAL: z.string().url(),
  MONGODB_URI: z.string().url(),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
