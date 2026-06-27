export interface FilterOption {
  label: string
  count?: number
  disabled?: boolean
}

export type FilterType = 'checkbox' | 'dropdown'

export interface FilterGroup {
  id: string
  label: string
  type: FilterType
  options: FilterOption[]
  value: string[] // List of currently active values
  onChange: (value: string[]) => void
}
