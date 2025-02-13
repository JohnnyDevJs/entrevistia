'use server'

import { register } from '@/backend/controllers/auth.controller'
export async function registerUser(
  name: string,
  email: string,
  password: string,
) {
  await register(name, email, password)
}
