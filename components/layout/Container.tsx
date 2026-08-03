import React from 'react'

type ContainerVariant = 'reading' | 'standard' | 'wide' | 'cinematic'

interface ContainerProps {
  children: React.ReactNode
  variant?: ContainerVariant
  className?: string
}

const variantClasses: Record<ContainerVariant, string> = {
  reading: 'max-w-reading',
  standard: 'max-w-standard',
  wide: 'max-w-wide',
  cinematic: 'max-w-cinematic',
}

export function Container({
  children,
  variant = 'standard',
  className = '',
}: ContainerProps) {
  return (
    <div
      className={`mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </div>
  )
}

type SectionVariant = 'compact' | 'default' | 'large' | 'cinematic'
type SectionTone = 'white' | 'quartz' | 'limestone' | 'basalt' | 'slate' | 'transparent'

interface SectionProps {
  children: React.ReactNode
  variant?: SectionVariant
  tone?: SectionTone
  className?: string
  id?: string
}

const toneClasses: Record<SectionTone, string> = {
  white: 'bg-white',
  quartz: 'bg-quartz',
  limestone: 'bg-limestone',
  basalt: 'bg-basalt text-white',
  slate: 'bg-slate text-white',
  transparent: 'bg-transparent',
}

const spacingClasses: Record<SectionVariant, string> = {
  compact: 'py-[var(--section-compact)]',
  default: 'py-[var(--section-default)]',
  large: 'py-[var(--section-large)]',
  cinematic: 'py-[var(--section-cinematic)]',
}

export function Section({
  children,
  variant = 'default',
  tone = 'white',
  className = '',
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${spacingClasses[variant]} ${toneClasses[tone]} ${className}`}
    >
      {children}
    </section>
  )
}

type StackGap = 'sm' | 'md' | 'lg' | 'xl'

interface StackProps {
  children: React.ReactNode
  gap?: StackGap
  className?: string
}

const stackGapClasses: Record<StackGap, string> = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
}

export function Stack({
  children,
  gap = 'md',
  className = '',
}: StackProps) {
  return (
    <div className={`flex flex-col ${stackGapClasses[gap]} ${className}`}>
      {children}
    </div>
  )
}

type InlineGap = 'sm' | 'md' | 'lg' | 'xl'

interface InlineProps {
  children: React.ReactNode
  gap?: InlineGap
  className?: string
}

const inlineGapClasses: Record<InlineGap, string> = {
  sm: 'gap-2',
  md: 'gap-3',
  lg: 'gap-4',
  xl: 'gap-6',
}

export function Inline({
  children,
  gap = 'md',
  className = '',
}: InlineProps) {
  return (
    <div className={`flex flex-wrap items-center ${inlineGapClasses[gap]} ${className}`}>
      {children}
    </div>
  )
}