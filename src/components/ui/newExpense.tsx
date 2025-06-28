import * as React from "react"
import {
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog"
import { DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Dialog as NestedDialog,
  DialogTrigger as NestedTrigger,
  DialogContent as NestedContent,
} from "@/components/ui/dialog"
import { Label } from "./label"
import { Input } from "./input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./select"

// Tipagem das props
interface NewExpenseComponentProps {
  setParentOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function NewExpenseComponent({ setParentOpen }: NewExpenseComponentProps) {
  const [nestedOpen, setNestedOpen] = React.useState(false)

  function handleFinishProcess() {     
    setParentOpen(false)
  }

  function handleNestedFinish() {    
    setNestedOpen(false)
  }

  return (
    <>
        <DialogHeader>
        <DialogTitle>Nova Despesa</DialogTitle>      

        {/* <div className="flex gap-2 mt-4">
            <Button variant="default" onClick={handleFinishProcess}>
            Salvar e fechar
            </Button>            
            <NestedDialog open={nestedOpen} onOpenChange={setNestedOpen}>
            <NestedTrigger asChild>
                <Button variant="secondary">Abrir Modal Interno</Button>
            </NestedTrigger>
            <NestedContent>
                <DialogHeader>
                <DialogTitle>Modal Interno</DialogTitle>
                <DialogDescription>
                    Este é um modal aninhado dentro do principal.
                </DialogDescription>
                <Button onClick={handleNestedFinish}>Fechar Modal Interno</Button>
                </DialogHeader>
            </NestedContent>
            </NestedDialog>
        </div> */}
        </DialogHeader>
        <form className="space-y-6">
            <div className="grid grid-cols-4 items-center text-right gap-3"> 
                <Label htmlFor="expense">Despesa</Label>
                <Input className="col-span-3" placeholder="Descrição da despesa" id="name"/>
            </div>
            <div className="grid grid-cols-4 items-center text-right gap-3"> 
                <Label htmlFor="value">Valor</Label>
                <Input className="col-span-3" placeholder="Valor da despesa" id="value"/>
            </div>
            <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="paymentType">Tipo de pagamento</Label>
                <Select>
                    <SelectTrigger className="col-span-3" id="paymentType">
                        <SelectValue placeholder="Tipo de pagamento" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Tipos</SelectLabel>
                        <SelectItem value="credito">Cartão de Crédito</SelectItem>
                        <SelectItem value="debito">Cartão de Débito</SelectItem>
                        <SelectItem value="pix">Pix</SelectItem>
                        <SelectItem value="boleto">Boleto</SelectItem>
                    </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="category">Categoria</Label>
                <Select>
                    <SelectTrigger className="col-span-3" id="category">
                        <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Tipos</SelectLabel>
                        <SelectItem value="credito">Comida</SelectItem>
                        <SelectItem value="debito">blabla</SelectItem>
                        <SelectItem value="pix">Pix</SelectItem>
                        <SelectItem value="boleto">Boleto</SelectItem>
                    </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <DialogFooter>
                    <Button className="bg-[var(--personalized)]">Salvar</Button>
            </DialogFooter>
        </form>
    </>
  )
}
