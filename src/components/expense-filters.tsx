import { Input } from './ui/input'

interface ExpenseFiltersProps {
  filterDescription: string
  filterValue: string
  onDescriptionChange: (value: string) => void
  onValueChange: (value: string) => void
}

export function ExpenseFilters({
  filterDescription,
  filterValue,
  onDescriptionChange,
  onValueChange,
}: ExpenseFiltersProps) {
  return (
    <form
      onSubmit={e => e.preventDefault()}
      className="flex items-center gap-2"
    >
      <Input
        name="expense"
        placeholder="Nome da despesa"
        className="w-auto"
        value={filterDescription}
        onChange={e => onDescriptionChange(e.target.value)}
      />
      <Input
        name="value"
        placeholder="Valor da despesa"
        className="w-auto"
        value={filterValue}
        onChange={e => onValueChange(e.target.value)}
      />
    </form>
  )
}
