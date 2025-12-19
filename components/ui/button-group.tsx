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
          return React.cloneElement(
            child as React.ReactElement<any>,
            {
              className: cn(
                child.props.className,
                'rounded-none',
                index === 0 && 'rounded-l-md!',
                index ===
                  React.Children.count(children) - 1 &&
                  'rounded-r-md!',
                index !== 0 && '-ml-px'
              )
            }
          )
        }
        return child
      })}
    </div>
  )
})
ButtonGroup.displayName = 'ButtonGroup'

export { ButtonGroup }
