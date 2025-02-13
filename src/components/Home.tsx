'use client'

import { Hero } from './layout/hero'
import { InterviewProcessCards } from './layout/interview-process-cards'
import { LandingPageStats } from './layout/landing-page-stats'
import { Pricing } from './layout/pricing'
import { Testimonials } from './layout/testimonials'

export function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Hero />
      <LandingPageStats />
      <Testimonials />
      <Pricing />
      <InterviewProcessCards />
    </div>
  )
}
