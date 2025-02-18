/* eslint-disable no-var */
import mongoose from 'mongoose'

import { env } from '@/env'

const MONGODB_URI =
  env.NODE_ENV === 'development' ? env.MONGODB_URI_LOCAL! : env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined')
}

type MongooseCache = {
  promise: Promise<typeof mongoose> | null
  conn: typeof mongoose | null
}

declare global {
  var mongoose: MongooseCache
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { promise: null, conn: null }
}

cached.conn = await cached.promise

export async function dbConnect() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose)
  }

  cached.conn = await cached.promise

  return cached.conn
}
