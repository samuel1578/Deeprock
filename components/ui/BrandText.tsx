import { Fragment } from 'react'

interface BrandTextProps {
  /**
   * Source text (string form). Mutually exclusive with string children.
   */
  text?: string
  /**
   * Pass-through ReactNode. When a string, it is rendered with the
   * "Deep Rock" glow; other nodes are returned untouched.
   */
  children?: React.ReactNode
  className?: string
}

/**
 * SSR-safe brand-name renderer.
 *
 * Wraps every occurrence of the exact phrase "Deep Rock" in the orange glow
 * treatment (`.deep-rock-brand` in globals.css). Plain string splitting at the
 * rendering boundary — no dangerouslySetInnerHTML, no post-render DOM
 * mutation, deterministic on server and client, so hydration cannot mismatch.
 *
 * The split keeps the surrounding sentence and punctuation intact; the
 * highlighted phrase remains real, selectable, screen-reader-visible text.
 *
 * Server component: importing it never pulls Framer Motion or client hooks
 * into a page.
 */
export function BrandText({ text, children, className }: BrandTextProps) {
  const source =
    typeof text === 'string' ? text : typeof children === 'string' ? children : ''

  if (!source) {
    // Non-string children (rare) pass through untouched.
    return <>{children}</>
  }

  const parts = source.split(/(Deep Rock)/gi)

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === 'deep rock' ? (
          <span
            key={`${part}-${index}`}
            className={`deep-rock-brand${className ? ` ${className}` : ''}`}
          >
            {part}
          </span>
        ) : (
          <Fragment key={`${part}-${index}`}>{part}</Fragment>
        ),
      )}
    </>
  )
}
