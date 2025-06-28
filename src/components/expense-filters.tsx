import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Category {
  id: number
  name: string
}

interface PaymentType {
  id: number
  name: string
}

interface Filters {
  description: string
  value: string
  categoryId: string
  paymentTypeId: string
}

interface ExpenseFiltersProps {
  description: string
  value: string
  categoryId: string
  paymentTypeId: string
  categories: Category[]
  paymentTypes: PaymentType[]
  onChange: (filters: Filters) => void
}

export function ExpenseFilters({
  description,
  value,
  categoryId,
  paymentTypeId,
  categories,
  paymentTypes,
  onChange,
}: ExpenseFiltersProps) {
  function handleChange(field: keyof Filters, newValue: string) {
    onChange({
      description,
      value,
      categoryId,
      paymentTypeId,
      [field]: newValue,
    })
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-wrap gap-4 items-end mb-4"
    >
      {/* Descrição */}
      <div className="flex flex-col">
        <Label htmlFor="filter-description">Descrição</Label>
        <Input
          id="filter-description"
          placeholder="Descrição da despesa"
          value={description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="min-w-[200px]"
        />
      </div>

      {/* Valor */}
      <div className="flex flex-col">
        <Label htmlFor="filter-value">Valor</Label>
        <Input
          id="filter-value"
          placeholder="Valor da despesa"
          value={value}
          onChange={(e) => handleChange("value", e.target.value)}
          className="min-w-[150px]"
        />
      </div>

      {/* Categoria */}
      <div className="flex flex-col">
        <Label htmlFor="filter-category">Categoria</Label>
        <Select
          value={categoryId}
          onValueChange={(val) => handleChange("categoryId", val)}
        >
          <SelectTrigger id="filter-category" className="min-w-[180px]">
            <SelectValue placeholder="Todas" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categorias</SelectLabel>
              <SelectItem value="">Todas</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={String(cat.id)}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Tipo de Pagamento */}
      <div className="flex flex-col">
        <Label htmlFor="filter-paymentType">Tipo de Pagamento</Label>
        <Select
          value={paymentTypeId}
          onValueChange={(val) => handleChange("paymentTypeId", val)}
        >
          <SelectTrigger id="filter-paymentType" className="min-w-[180px]">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tipos de Pagamento</SelectLabel>
              <SelectItem value="all">Todos</SelectItem>
              {paymentTypes.map((type) => (
                <SelectItem key={type.id} value={String(type.id)}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </form>
  )
}
