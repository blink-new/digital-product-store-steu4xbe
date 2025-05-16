import React from 'react'
import { cn } from '../lib/utils'
import Container from './Container'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
  containerSize?: 'default' | 'small' | 'large'
  containerClassName?: string
}

const Section = ({
  children,
  className,
  containerSize = 'default',
  containerClassName,
  ...props
}: SectionProps) => {
  return (
    <section
      className={cn('py-8 md:py-12', className)}
      {...props}
    >
      <Container size={containerSize} className={containerClassName}>
        {children}
      </Container>
    </section>
  )
}

export default Section