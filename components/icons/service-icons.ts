import type { Icon } from '@phosphor-icons/react'
import {
  Blueprint,
  Compass,
  CurrencyCircleDollar,
  Hammer,
  Leaf,
  Stack,
  Toolbox,
  Wrench,
} from '@phosphor-icons/react'

export const serviceIconMap = {
  'gold-buying-trading': CurrencyCircleDollar,
  'gold-aggregation': Stack,
  'mining-operations': Hammer,
  'mineral-exploration': Compass,
  'mining-equipment-supply': Toolbox,
  'geological-consulting': Blueprint,
  'environmental-sustainability': Leaf,
  'mining-support': Wrench,
} satisfies Record<string, Icon>

export type ServiceIconKey = keyof typeof serviceIconMap
