'use client'

import { Icon } from '@iconify/react'
import React from 'react'

import { FeatureCard } from './feature-card'

const featuresCategories = [
  {
    key: 'generate',
    title: 'Gerar Perguntas',
    icon: <Icon icon="solar:mask-happly-linear" width={40} />,
    descriptions: [
      'Crie perguntas de entrevista personalizadas com base na sua área de especialização.',
      'Cubra uma ampla gama de tópicos para garantir uma preparação abrangente.',
      'Gere cenários específicos para o cargo para testar o pensamento crítico.',
    ],
  },
  {
    key: 'provide',
    title: 'Assistência nas Respostas',
    icon: <Icon icon="solar:magic-stick-3-linear" width={40} />,
    descriptions: [
      'Receba sugestões baseadas em IA para criar respostas impactantes.',
      'Pratique com respostas modelo para refinar suas respostas.',
      'Simule entrevistas em tempo real com o Prep AI.',
    ],
  },
  {
    key: 'analyze',
    title: 'Analisar e Melhorar',
    icon: <Icon icon="solar:shield-warning-outline" width={40} />,
    descriptions: [
      'Receba feedback detalhado sobre o seu desempenho.',
      'Identifique pontos fortes e áreas para melhorar.',
      'Acompanhe seu progresso ao longo do tempo para garantir que está preparado.',
    ],
  },
]

export function InterviewProcessCards() {
  return (
    <div className="my-10">
      <div className="text-center">
        <span className="tracking-tight inline font-semibold bg-clip-text text-transparent bg-gradient-to-b from-pink-500 to-violet-500 text-[2.3rem] lg:text-5xl leading-9">
          Processo Confiável
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 my-10">
        {featuresCategories.map((category) => (
          <FeatureCard
            key={category.key}
            descriptions={category.descriptions}
            icon={category.icon}
            title={category.title}
          />
        ))}
      </div>
    </div>
  )
}
