import React from 'react'
import { cn } from '../lib/utils'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  size?: 'default' | 'small' | 'large'
  className?: string
}

const Container = ({
  children,
  size = 'default',
  className,
  ...props
}: ContainerProps) => {
  return (
    <div
      className={cn(
        'w-full mx-auto px-4 md:px-6',
        {
          'max-w-7xl': size === 'large',
          'max-w-screen-lg': size === 'default',
          'max-w-4xl': size === 'small',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Container
