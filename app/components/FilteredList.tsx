import { ReactElement } from 'react'
import { useCombobox } from 'downshift'

function ListItem({
  item,
  isHighlighted,
  getItemProps,
  index
}: {
  item: React.ReactNode
  isHighlighted: boolean
  getItemProps: ReturnType<
    typeof useCombobox
  >['getItemProps']
  index: number
}) {
  const itemProps = getItemProps({ item, index })

  // Override onClick to check for text selection
  const handleClick = (e: React.MouseEvent) => {
    const selection = window.getSelection()
    const hasSelection =
      selection && selection.toString().length > 0

    // If text is selected, don't trigger item click
    if (hasSelection) {
      e.stopPropagation()
      return
    }

    // Otherwise, call the original onClick handler
    if (itemProps.onClick) {
      itemProps.onClick(e)
    }
  }

  // Don't prevent default on mousedown to allow text selection
  const handleMouseDown = (e: React.MouseEvent) => {
    // Let the default behavior happen for text selection
    // Only call downshift's handler if needed
    if (itemProps.onMouseDown) {
      // Don't prevent default - allow text selection to work
      const event = { ...e, preventDefault: () => {} }
      itemProps.onMouseDown(event)
    }
  }

  return (
    <li
      {...itemProps}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      style={{
        padding: '8px 12px',
        backgroundColor: isHighlighted
          ? '#e5e7eb'
          : 'transparent',
        userSelect: 'text'
      }}
      className="border-b border-gray-300"
    >
      {item}
    </li>
  )
}

export function FilteredList<Item>({
  placeholder,
  rows,
  searchText,
  onSearchTextChange,
  onItemSelect,
  getKey,
  renderItem,
  resultsSummary
}: {
  placeholder: string
  rows: Item[]
  searchText: string
  onSearchTextChange: (value: string) => void
  onItemSelect?: (item: Item) => void
  getKey: (item: Item) => string
  renderItem: (item: Item) => React.ReactNode
  resultsSummary: ReactElement
}) {
  const {
    isOpen,
    getInputProps,
    getMenuProps,
    getItemProps,
    highlightedIndex
  } = useCombobox({
    isOpen: true,
    items: rows,
    initialInputValue: searchText,
    onInputValueChange: ({ inputValue }) => {
      onSearchTextChange(inputValue ?? '')
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        onItemSelect?.(selectedItem)
      }
    },
    stateReducer: (_, actionAndChanges) => {
      const { type, changes } = actionAndChanges
      const shouldClearInput =
        type ===
        useCombobox.stateChangeTypes.InputKeyDownEscape
      if (shouldClearInput) {
        return {
          ...changes,
          inputValue: '' // Clear search text on Escape
        }
      }
      if (
        type === useCombobox.stateChangeTypes.ItemClick ||
        type ===
          useCombobox.stateChangeTypes.InputKeyDownEnter
      ) {
        return {
          ...changes,
          isOpen: false,
          inputValue: searchText // Keep search text unchanged
        }
      }
      return changes
    }
  })

  return (
    <div className="flex flex-col min-h-0 h-full">
      <input
        {...getInputProps()}
        type="search"
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '8px 12px',
          border: '1px solid #d1d5db',
          borderRadius: '4px',
          fontSize: '14px'
        }}
      />
      <div className="mt-2 mb-1">{resultsSummary}</div>
      <ul
        {...getMenuProps()}
        style={{
          height: '100%',
          overflowY: 'auto',
          listStyle: 'none',
          padding: 0,
          border:
            isOpen && rows.length > 0
              ? '1px solid #d1d5db'
              : 'none',
          borderRadius: '4px',
          display:
            isOpen && rows.length > 0 ? 'block' : 'none'
        }}
      >
        {isOpen &&
          rows.map((item, index) => (
            <ListItem
              key={getKey(item)}
              item={renderItem(item)}
              index={index}
              isHighlighted={highlightedIndex === index}
              getItemProps={getItemProps}
            />
          ))}
      </ul>
    </div>
  )
}
