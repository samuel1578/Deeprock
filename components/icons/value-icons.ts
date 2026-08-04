import type { Icon } from '@phosphor-icons/react'
import {
  ShieldCheckIcon,
  EyeIcon,
  HardHatIcon,
  MedalIcon,
  LeafIcon,
  ScalesIcon,
  UsersThreeIcon,
} from '@phosphor-icons/react'

export const valueIconMap = {
  integrity: ShieldCheckIcon,
  transparency: EyeIcon,
  safety: HardHatIcon,
  excellence: MedalIcon,
  sustainability: LeafIcon,
  accountability: ScalesIcon,
  'customer-focus': UsersThreeIcon,
} satisfies Record<string, Icon>

export type ValueIconKey = keyof typeof valueIconMap

export type ValueCardVariant = 'copper' | 'slate'

export function getValueVariant(index: number): ValueCardVariant {
  return index % 2 === 0 ? 'copper' : 'slate'
}