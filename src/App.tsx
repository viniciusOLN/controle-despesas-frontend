import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import {Search, Plus} from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { NewExpenseComponent } from './components/create-new-expense'

export function App() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className='p-6 max-w-4xl mx-auto space-y-4'>
      <h1 className='text-3xl font-bold'>Consulta de Despesas</h1>

      <div className="flex items-center justify-between">
          <form className='flex items-center gap-2'>
            <Input name= "expense" placeholder='Nome da despesa' className='w-auto'></Input>
             <Input name= "value" placeholder='Valor da despesa' className='w-auto'></Input>
             <Button type='submit' variant="outline" className='text-(--personalized)'>
              <Search className='w-6 h-6 mr-2'/>
              Filtrar
             </Button>
          </form>
          <Dialog open={open} onOpenChange={setOpen}>
           <DialogTrigger asChild>
                <Button variant="link" className='text-(--personalized)'>
                <Plus className='w-6 h-6'/>
                Nova Despesa
              </Button>
           </DialogTrigger>
           <DialogContent>
              <NewExpenseComponent setParentOpen={setOpen}/>
            </DialogContent>
          </Dialog>          
      </div>
      <div className='border rounded p-2'>        

        <Table className='text-[var(--personalized)]'>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Despesa</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Tipo de Pagamento</TableHead>
              <TableHead>Tipo de Pagamento</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Cidade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>TESTE</TableCell>
              <TableCell>TESTE</TableCell>
              <TableCell>TESTE</TableCell>
              <TableCell>TESTE</TableCell>
              <TableCell>TESTE</TableCell>
              <TableCell>TESTE</TableCell>
              <TableCell>TESTE</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

