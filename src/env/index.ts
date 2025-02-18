import mongoose from 'mongoose'
import { z } from 'zod'

const envSchema = z.object({
  MONGODB_URI_LOCAL: z.string().url(),
  MONGODB_URI: z.string().url(),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('❌ Invalid environment variables', _env.error.format())
  throw new Error('Invalid environment variables.')
}

export const env = _env.data

const MONGODB_URI =
  env.NODE_ENV === 'development' ? env.MONGODB_URI_LOCAL : env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('MongoDB connection string is missing.')
}

let isConnected = false

export async function dbConnect() {
  if (isConnected) {
    console.log('✅ Using existing database connection')
    return
  }

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      dbName: 'your_database_name',
      bufferCommands: false,
    })
    isConnected = db.connections[0].readyState === 1

    console.log('✅ Database connected successfully')
  } catch (error) {
    console.error('❌ Database connection error:', error)
    throw new Error('Failed to connect to MongoDB')
  }
}
