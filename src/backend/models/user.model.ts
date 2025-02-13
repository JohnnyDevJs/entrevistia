import mongoose, { Document } from 'mongoose'

import { userRoles } from '@/data/testimonials'

export interface IUser extends Document {
  _id: string
  name: string
  email: string
  roles: string[]
  profilePicture: {
    id: string
    url: string | null
  }
  password?: string | null
  authProviders: {
    provider: string
    providerId: string
  }[]
  subscription: {
    id: string
    customer: string
    createdAt: Date
    status: string
    startDate: Date
    currentPeriodEnd: Date
    nextPaymentAttempt: Date
  }
}

const authProvidersSchema = new mongoose.Schema({
  provider: {
    type: String,
    required: true,
    enum: ['google', 'github', 'credentials'],
  },
  providerId: { type: String, required: true },
})

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Por favor, insira seu nome'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Por favor, insira seu email'],
      trim: true,
      unique: true,
      lowercase: true,
    },
    roles: {
      type: [String],
      default: ['user'],
      enum: userRoles,
    },
    profilePicture: {
      id: { type: String },
      url: { type: String, default: null },
    },
    password: {
      type: String,
      select: false,
      minLength: [6, 'A senha deve ter pelo menos 6 caracteres'],
      default: null,
    },
    authProviders: {
      type: [authProvidersSchema],
      default: [],
    },
    subscription: {
      id: String,
      customer: String,
      createdAt: Date,
      status: String,
      startDate: Date,
      currentPeriodEnd: Date,
      nextPaymentAttempt: Date,
    },
  },
  {
    timestamps: true,
  },
)

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema)

export { User }
