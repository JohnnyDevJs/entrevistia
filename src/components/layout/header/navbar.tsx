'use client'

import {} from '@heroui/navbar'
import {
  Button,
  Link,
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Skeleton,
  User,
} from '@heroui/react'
import { Icon } from '@iconify/react'
import NextLink from 'next/link'
import { useSession } from 'next-auth/react'

import { IUser } from '@/backend/models/user.model'
import { Logo } from '@/components/logo'
import { APP_NAME } from '@/constants'
import { extractFirstAndLastName } from '@/lib/utils'

import { NavbarUser } from './navbar-user'

export function Navbar() {
  const { data } = useSession()

  const user = data?.user as IUser

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">{APP_NAME}</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2"></NavbarItem>

        {data?.user ? (
          <>
            <NavbarItem className="hidden sm:flex">
              <Button
                className="bg-foreground font-medium text-background px-5"
                color="secondary"
                radius="full"
                variant="flat"
                as={Link}
                href="/subscribe"
              >
                Assine por R$ 9,99
              </Button>
            </NavbarItem>
            <NavbarItem className="hidden sm:flex">
              <NavbarUser user={user} />
            </NavbarItem>
          </>
        ) : (
          <>
            {data === undefined && (
              <Skeleton className="flex rounded-full w-[99px] h-10" />
            )}
            {data === null && (
              <Button
                className="bg-foreground font-medium text-background px-5"
                color="secondary"
                endContent={<Icon icon="solar:alt-arrow-right-linear" />}
                radius="full"
                variant="flat"
                as={Link}
                href="/login"
              >
                Login
              </Button>
            )}
          </>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle aria-label="Open menu" />
      </NavbarContent>

      <NavbarMenu className="pt-16">
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src: user?.profilePicture.url ?? '/images/default-user.png',
          }}
          className="transition-transform mb-5"
          description={user?.email}
          name={extractFirstAndLastName(user?.name)}
        />
        <NavbarMenuItem>
          <Link
            color={'foreground'}
            href="/admin/dashboard"
            size="lg"
            className="flex gap-1"
          >
            <Icon icon="tabler:user-cog" /> Admin Dashboard
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link
            color={'foreground'}
            href="/app/dashboard"
            size="lg"
            className="flex gap-1"
          >
            <Icon icon="hugeicons:ai-brain-04" /> App Dashboard
          </Link>
        </NavbarMenuItem>

        <NavbarMenuItem>
          <Link color={'danger'} as={Link} size="lg" className="flex gap-1">
            <Icon icon="tabler:logout-2" /> Logout
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </NextUINavbar>
  )
}
