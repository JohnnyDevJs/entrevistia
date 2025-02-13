import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
} from '@heroui/react'
import { Icon } from '@iconify/react'
import React from 'react'

export function Pricing() {
  const features = [
    'Perguntas abrangentes',
    'Relatórios ou resultados de feedback',
    'Você escolhe o tempo e a área',
    'Entrevistas específicas para a indústria',
    'Tutoriais em vídeo com especialistas',
    'Prática de perguntas técnicas',
    'Prática de perguntas comportamentais',
    'Preparação para perguntas situacionais',
    'Suporte de mentor AI 24/7',
    'Treinamento de habilidades interpessoais',
  ]

  return (
    <div id="pricing">
      <div className="text-center my-10">
        <span className="tracking-tight inline font-semibold bg-clip-text text-transparent bg-gradient-to-b from-pink-500 to-violet-500 text-[2.3rem] lg:text-5xl leading-9">
          Planos
        </span>
      </div>

      <Card className="max-w-[400px] p-2 border-solid border-4 border-blue-400">
        <CardHeader className="flex gap-3 mb-3">
          <div className="flex flex-col">
            <p className="text-xl font-extrabold">Versão PRO</p>
            <p className="text-md text-default-500">
              Ideal para todos os tipos de usuários
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex items-baseline space-x-1">
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                R$9.99
              </span>
            </h1>
            <p>/ mês</p>
          </div>

          <ul className="mt-8 max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <Icon icon="hugeicons-tick-02" fontSize={26} color="green" />{' '}
                {feature}
              </li>
            ))}
          </ul>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button
            color="primary"
            className="w-full my-3"
            endContent={<Icon icon="akar-icons:arrow-right" />}
            as={Link}
            href="/subscribe"
          >
            Comece agora
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
