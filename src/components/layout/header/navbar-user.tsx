import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react'
import { User } from '@heroui/react'
import { Icon } from '@iconify/react'
import React from 'react'

export function NavbarUser() {
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: '/images/default_user.png',
            }}
            className="transition-transform"
            description="john.doe@example.com"
            name="John Doe"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Conectado como</p>
            <p className="font-bold">john.doe@example.com</p>
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
          >
            Sair
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
