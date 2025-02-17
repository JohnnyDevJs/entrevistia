import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react'
import { User } from '@heroui/react'
import { Icon } from '@iconify/react'
import { signOut } from 'next-auth/react'
import React from 'react'

import { IUser } from '@/backend/models/user.model'
import { extractFirstAndLastName } from '@/lib/utils'

type NavbarUserProps = {
  user: IUser
}

export function NavbarUser({ user }: NavbarUserProps) {
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: user.profilePicture.url ?? '/images/default-user.png',
            }}
            className="transition-transform"
            description={user.email}
            name={extractFirstAndLastName(user.name)}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Conectado como</p>
            <p className="font-bold">{user.email}</p>
          </DropdownItem>
          <DropdownItem
            key="admin_dashboard"
            href="/admin/dashboard"
            startContent={<Icon icon="tabler:user-cog" />}
          >
            Painel Admin
          </DropdownItem>
          <DropdownItem
            key="app_dashboard"
            href="/app/dashboard"
            startContent={<Icon icon="hugeicons:ai-brain-04" />}
          >
            Painel do App
          </DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            startContent={<Icon icon="tabler:logout-2" />}
            onPress={() => signOut()}
          >
            Sair
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
