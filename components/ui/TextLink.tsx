import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TextLinkProps {
  href: string
  children: React.ReactNode
  variant?: 'standard' | 'arrow' | 'underlined' | 'light' | 'copper'
  showIcon?: boolean
  className?: string
}

export function TextLink({
  href,
  children,
  variant = 'standard',
  showIcon = false,
  className = '',
}: TextLinkProps) {
  const variantClasses = {
    standard: 'text-copper hover:text-copper-hover',
    arrow: 'text-copper hover:text-copper-hover group',
    underlined: 'text-copper hover:text-copper-hover underline underline-offset-4 decoration-copper/30 hover:decoration-copper',
    light: 'text-limestone hover:text-clay',
    copper: 'text-copper hover:text-copper-hover font-medium',
  }

  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper rounded',
        variantClasses[variant],
        className,
      )}
    >
      {children}
      {showIcon && variant === 'arrow' && (
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      )}
      {showIcon && variant !== 'arrow' && (
        <ArrowRight className="w-4 h-4" />
      )}
    </Link>
  )
}