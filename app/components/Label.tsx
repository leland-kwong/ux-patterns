export function DemoLabel({
  children
}: {
  children: string
}) {
  return (
    <div className="text-xs font-bold uppercase tracking-wider mb-3 text-gray-600">
      {children}
    </div>
  )
}
