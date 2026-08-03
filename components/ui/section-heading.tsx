import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  action?: React.ReactNode
  alignment?: 'left' | 'center'
  tone?: 'light' | 'dark'
  width?: 'reading' | 'standard' | 'wide'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  alignment = 'left',
  tone = 'light',
  width = 'standard',
  className = '',
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
  }

  const toneClasses = {
    light: 'text-basalt',
    dark: 'text-white',
  }

  const widthClasses = {
    reading: 'max-w-reading',
    standard: 'max-w-standard',
    wide: 'max-w-wide',
  }

  const descriptionToneClasses = {
    light: 'text-graphite',
    dark: 'text-limestone',
  }

  return (
    <div
      className={cn(
        alignmentClasses[alignment],
        widthClasses[width],
        className,
      )}
    >
      {eyebrow && (
        <p className="text-label text-copper mb-3">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'text-display-lg',
          toneClasses[tone],
          description && alignment === 'center' ? 'mx-auto' : '',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'text-body-lg mt-4',
            descriptionToneClasses[tone],
            alignment === 'center' ? 'mx-auto' : '',
          )}
          style={{ maxWidth: '48rem' }}
        >
          {description}
        </p>
      )}
      {action && (
        <div
          className={cn(
            'mt-6',
            alignment === 'center' ? 'flex justify-center' : '',
          )}
        >
          {action}
        </div>
      )}
    </div>
  )
}