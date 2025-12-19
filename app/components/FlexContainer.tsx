export function FlexContainer({
  children,
  className = ''
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className={`min-h-0 h-full min-w-0 ${className}`}>
      {children}
    </div>
  )
}
