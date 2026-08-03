import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const buttonVariants = cva(
  'group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-copper disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20',
  {
    variants: {
      variant: {
        primary:
          'bg-copper text-primary-foreground hover:bg-copper-hover focus-visible:ring-copper',
        'bright-pattern':
          'border-transparent bg-[#ff6200] text-white bg-[url("/images/patterns/deeprock-button-pattern.svg")] bg-repeat bg-[length:220px_auto] bg-blend-multiply shadow-[0_8px_24px_rgba(255,98,0,0.22)] hover:brightness-105 hover:shadow-[0_10px_30px_rgba(255,98,0,0.32)] active:translate-y-px active:brightness-95 focus-visible:ring-2 focus-visible:ring-[#ff6200] focus-visible:ring-offset-2 disabled:brightness-75',
        'dark-pattern':
          'border-transparent bg-[#313B45] text-white bg-[url("/images/patterns/deeprock-button-pattern-light.svg")] bg-repeat bg-[length:220px_84px] shadow-[0_8px_22px_rgba(49,59,69,0.18)] hover:brightness-110 hover:shadow-[0_10px_28px_rgba(49,59,69,0.26)] active:translate-y-px active:brightness-95 focus-visible:ring-2 focus-visible:ring-[#313B45] focus-visible:ring-offset-2 disabled:brightness-75',
        secondary:
          'bg-surface text-foreground border-border hover:bg-surface-muted focus-visible:ring-copper',
        outline:
          'bg-transparent text-foreground border-border hover:bg-surface-muted focus-visible:ring-copper',
        dark:
          'bg-dark-surface text-dark-surface-foreground hover:bg-slate focus-visible:ring-copper',
        light:
          'bg-white text-foreground border-border hover:bg-quartz focus-visible:ring-copper',
        ghost:
          'bg-transparent text-foreground hover:bg-surface-muted focus-visible:ring-copper',
        link:
          'bg-transparent text-primary underline-offset-4 hover:underline focus-visible:ring-copper',
      },
      size: {
        sm: 'h-9 px-3 text-sm rounded-[var(--radius-controls)]',
        md: 'h-11 px-5 text-sm rounded-[var(--radius-button)]',
        lg: 'h-12 px-6 text-base rounded-[var(--radius-button)]',
        icon: 'size-11 rounded-[var(--radius-button)]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  loading?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

function Button({
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  iconLeft,
  iconRight,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {iconLeft && !loading && <span className="mr-2 inline-flex">{iconLeft}</span>}
      {children}
      {iconRight && <span className="ml-2 inline-flex">{iconRight}</span>}
    </button>
  )
}

interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof buttonVariants> {
  href: string
  loading?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

function ButtonLink({
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  iconLeft,
  iconRight,
  children,
  href,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant, size, className }),
        'no-underline',
      )}
      {...props}
    >
      {loading && (
        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {iconLeft && !loading && <span className="mr-2 inline-flex">{iconLeft}</span>}
      {children}
      {iconRight && <span className="ml-2 inline-flex">{iconRight}</span>}
    </Link>
  )
}

export { Button, ButtonLink, buttonVariants }