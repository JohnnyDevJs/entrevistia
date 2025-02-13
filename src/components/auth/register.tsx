'use client'

import { Button, Form, Input, Link } from '@heroui/react'
import { Icon } from '@iconify/react'
import { FormEvent, useState } from 'react'

import { registerUser } from '@/actions/auth.actions'

// import { registerUser } from '@/actions/auth.actions'
import { Logo } from '../logo'

// import { useGenericSubmitHandler } from '../form/genericSubmitHandler'

export function Register() {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  // const router = useRouter()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    const res = await registerUser(
      data.name as string,
      data.email as string,
      data.password as string,
    )

    console.log(res)
  }

  // const { handleSubmit, loading } = useGenericSubmitHandler(async (data) => {
  //   const res = await registerUser(data.name, data.email, data.password)

  //   if (res?.error) {
  //     return toast.error(res?.error?.message)
  //   }

  //   if (res?.created) {
  //     toast.success('Account created successfully')
  //     router.push('/login')
  //   }
  // })

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center pb-6">
          <Logo />
          <p className="text-xl font-medium">Bem-vindo</p>
          <p className="text-small text-default-500">
            Crie uma conta para começar
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Form onSubmit={handleSubmit} validationBehavior="native">
            <div className="flex flex-col w-full">
              <Input
                isRequired
                classNames={{
                  base: '-mb-[2px]',
                  inputWrapper:
                    'rounded-b-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10',
                }}
                label="Nome completo"
                name="name"
                placeholder="Digite seu nome completo"
                type="text"
                variant="bordered"
              />
              <Input
                isRequired
                classNames={{
                  base: '-mb-[2px]',
                  inputWrapper:
                    'rounded-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10',
                }}
                label="Endereço de e-mail"
                name="email"
                placeholder="Digite seu e-mail"
                type="email"
                variant="bordered"
              />
              <Input
                isRequired
                minLength={8}
                classNames={{
                  base: '-mb-[2px]',
                  inputWrapper:
                    'rounded-none data-[hover=true]:z-10 group-data-[focus-visible=true]:z-10',
                }}
                endContent={
                  <button type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-closed-linear"
                      />
                    ) : (
                      <Icon
                        className="pointer-events-none text-2xl text-default-400"
                        icon="solar:eye-bold"
                      />
                    )}
                  </button>
                }
                label="Senha"
                name="password"
                placeholder="Digite sua senha"
                type={isVisible ? 'text' : 'password'}
                variant="bordered"
              />
            </div>

            <Button
              className="w-full mt-2"
              color="primary"
              type="submit"
              // isDisabled={loading}
              // isLoading={loading}
            >
              Cadastrar
            </Button>
          </Form>
        </div>
        <p className="text-center text-small">
          Já tem uma conta?&nbsp;
          <Link href="/login" size="sm">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}
