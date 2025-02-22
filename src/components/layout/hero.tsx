import { Button } from '@heroui/react'
import { Icon } from '@iconify/react/dist/iconify.js'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <Button
        className="h-9 overflow-hidden border-1 border-default-100 bg-default-50 px-[18px] py-2 text-small font-normal leading-5 text-default-500"
        radius="full"
        variant="bordered"
      >
        Nova experiência de integração
        <Icon
          className="flex-none outline-none [&>path]:stroke-[2]"
          icon="solar:arrow-right-linear"
          width={20}
        />
      </Button>

      <div className="inline-block max-w-xl text-center justify-center">
        <span className="tracking-tight inline font-semibold bg-clip-text text-transparent bg-gradient-to-b from-pink-500 to-violet-500 text-[2.3rem] lg:text-5xl leading-9">
          Seu atalho
        </span>
        <br />
        <span className="tracking-tight inline font-semibold text-[2.3rem] lg:text-5xl leading-9">
          para uma Entrevista de Sucesso!
        </span>
        <div className="w-full  my-2 text-lg lg:text-xl text-default-600 block mt-4">
          Preparação para entrevistas com IA de forma simples e eficaz. Rápida,
          intuitiva e projetada para impulsionar sua carreira.
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
        <Button
          className="h-10 bg-default-foreground px-[30px] py-[10px] text-small font-medium leading-5 text-background"
          radius="full"
          as={Link}
          href="/subscribe"
        >
          Experimente o Entrevist AI agora
        </Button>
        <a href="#pricing">
          <Button
            className="h-10  border-1 border-default-100 px-[16px] py-[10px] text-small font-medium leading-5"
            radius="full"
            variant="bordered"
          >
            Veja nossos planos{' '}
            <Icon
              className="text-default-500 [&>path]:stroke-[1.5]"
              icon="solar:arrow-right-linear"
              width={16}
            />
          </Button>
        </a>
      </div>
    </section>
  )
}
