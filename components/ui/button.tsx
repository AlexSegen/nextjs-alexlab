import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

type Variant = 'default' | 'primary'

type CommonProps = {
  variant?: Variant
  className?: string
}

type LinkButtonProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'link'
    href: string
  }

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button'
  }

export type ButtonProps = LinkButtonProps | NativeButtonProps

const Button = (props: ButtonProps) => {
  const { variant = 'default', className = '' } = props
  const classes = `button${variant === 'primary' ? ' is-primary' : ''} ${className}`.trim()

  if (props.as === 'link') {
    const { as: _as, variant: _variant, className: _className, href, ...rest } = props
    return (
      <Link href={href} className={classes} {...rest}>
        {props.children}
      </Link>
    )
  }

  const { as: _as, variant: _variant, className: _className, ...rest } = props as NativeButtonProps
  return (
    <button className={classes} {...rest}>
      {props.children}
    </button>
  )
}

export default Button
