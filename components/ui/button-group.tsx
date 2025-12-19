import * as React from 'react'
import { cn } from '@/lib/utils'

const ButtonGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('inline-flex flex-wrap', className)}
      role="group"
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          const element = child as React.ReactElement<{
            className?: string
          }>
          return React.cloneElement(element, {
            className: cn(
              element.props.className,
              'rounded-none',
              index === 0 && 'rounded-l-md!',
              index === React.Children.count(children) - 1 &&
                'rounded-r-md!',
              index !== 0 && '-ml-px'
            )
          })
        }
        return child
      })}
    </div>
  )
})
ButtonGroup.displayName = 'ButtonGroup'

export { ButtonGroup }
