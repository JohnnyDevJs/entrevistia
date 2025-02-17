'use client'

import { Button, Divider, Form, Input, Link } from '@heroui/react'
import { Icon } from '@iconify/react'
// import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import React from 'react'

// import toast from 'react-hot-toast'
import { Logo } from '../logo'

export function Login() {
  const [isVisible, setIsVisible] = React.useState(false)
  // const router = useRouter()

  const toggleVisibility = () => setIsVisible(!isVisible)

  // const { handleSubmit, loading } = useGenericSubmitHandler(async (data) => {
  //   const res = await signIn('credentials', {
  //     redirect: false,
  //     email: data.email,
  //     password: data.password,
  //     callbackUrl: '/app/dashboard',
  //   })

  //   if (res?.error) {
  //     return toast.error(res?.error)
  //   }

  //   if (res?.ok) {
  //     router.push('/app/dashboard')
  //   }
  // })

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const res = await signIn('credentials', {
      redirect: false,
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    })

    console.log(res)
  }

  const handleGithubLogin = async () => {
    await signIn('github', {
      callbackUrl: '/app/dashboard',
    })
  }

  const handleGoogleLogin = async () => {
    await signIn('google', {
      callbackUrl: '/app/dashboard',
    })
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
        <div className="flex flex-col items-center pb-6">
          <Logo />
          <p className="text-xl font-medium">Bem-vindo de volta</p>
          <p className="text-small text-default-500">
            Faça login para continuar
          </p>
        </div>
        <Form
          className="flex flex-col gap-3"
          onSubmit={onSubmit}
          validationBehavior="native"
        >
          <Input
            isRequired
            label="Endereço de e-mail"
            name="email"
            placeholder="Digite seu e-mail"
            type="email"
            variant="bordered"
          />
          <Input
            isRequired
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
          <div className="flex w-full items-center justify-between px-1 py-2">
            <Link
              className="text-default-500"
              href="/password/forgot"
              size="sm"
            >
              Esqueceu sua senha?
            </Link>
          </div>
          <Button
            className="w-full"
            color="primary"
            type="submit"
            // isDisabled={loading}
            // isLoading={loading}
          >
            Entrar
          </Button>
        </Form>
        <div className="flex items-center gap-4 py-2">
          <Divider className="flex-1" />
          <p className="shrink-0 text-tiny text-default-500">OU</p>
          <Divider className="flex-1" />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            startContent={<Icon icon="flat-color-icons:google" width={24} />}
            variant="bordered"
            onPress={handleGoogleLogin}
          >
            Continuar com Google
          </Button>
          <Button
            startContent={
              <Icon className="text-default-500" icon="fe:github" width={24} />
            }
            variant="bordered"
            onPress={handleGithubLogin}
          >
            Continuar com Github
          </Button>
        </div>
        <p className="text-center text-small">
          Precisa criar uma conta?&nbsp;
          <Link href="/register" size="sm">
            Cadastre-se agora
          </Link>
        </p>
      </div>
    </div>
  )
}
