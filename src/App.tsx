import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Plus} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { NewExpenseComponent } from './components/create-new-expense'
import { getExpensesFromCurrentMonth } from './services/expense/get-all-expenses-from-current-month'
import { toast } from 'sonner'
import type { ExpenseDetails } from './services/expense/models/ExpenseDetails'
import { EditExpenseComponent } from './components/edit-expense'

export function App() {
  const [open, setOpen] = React.useState(false)
  const [openEditIndex, setOpenEditIndex] = React.useState<number | null>(null)
  const [expenses, setExpenses] = React.useState<ExpenseDetails[]>([])
  const [loadingData, setLoadingData] = React.useState<boolean>(false)
  const [filterDescription, setFilterDescription] = React.useState('')
  const [filterValue, setFilterValue] = React.useState('')

  async function loadExpensesFromThisMonth() {
    try {
        setLoadingData(true)
        const { success, data } = await getExpensesFromCurrentMonth(999);
        
        if (success) {
          if (data.length === 0) {
              toast("Nenhum tipo de pagamento encontrado.");
          } else {
              setExpenses(data);
          }
        } else {
            console.error("Erro ao carregar tipo de pagamentos");
            toast("Erro ao carregar tipos de pagamento");
        }
    } catch (error) {
        console.error("Erro inesperado ao carregar tipo de pagamentos:", error);
        toast("Erro inesperado ao carregar tipo de pagamentos.");
    } finally{
      setLoadingData(false)
    }
 }

  function formatDateTime(isoString: string): string {
    const date = new Date(isoString)

    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()

    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")

    return `${day}/${month}/${year} ${hours}:${minutes}`
  }

  const filteredExpenses = expenses.filter((item) => {
    const matchesDescription = item.description.toLowerCase().includes(filterDescription.toLowerCase());
    const matchesValue = filterValue === "" || item.value.toString().includes(filterValue);
    return matchesDescription && matchesValue;
  });

 

 useEffect(() => {
  loadExpensesFromThisMonth();
 }, [])

  return ( 
    <div className='p-6 max-w-4xl mx-auto space-y-4'>
      <h1 className='text-3xl font-bold'>Consulta de Despesas</h1>

      <div className="flex items-center justify-between">
          <form
            onSubmit={(e) => e.preventDefault()}
            className='flex items-center gap-2'
          >
            <Input
              name="expense"
              placeholder='Nome da despesa'
              className='w-auto'
              value={filterDescription}
              onChange={(e) => setFilterDescription(e.target.value)}
            />
            <Input
              name="value"
              placeholder='Valor da despesa'
              className='w-auto'
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />            
          </form>
          <Dialog open={open} onOpenChange={setOpen}>
           <DialogTrigger asChild>
                <Button variant="link" className='text-(--personalized)'>
                <Plus className='w-6 h-6'/>
                Nova Despesa
              </Button>
           </DialogTrigger>
           <DialogContent className="max-h-[90vh] overflow-y-auto">
              <NewExpenseComponent setParentOpen={setOpen}/>
            </DialogContent>
          </Dialog>          
      </div>
      <div className='border rounded p-2'>        

        <Table className='text-[var(--personalized)]'>
          <TableHeader>
            <TableRow>             
              <TableHead>Despesa</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Tipo de Pagamento</TableHead>
              <TableHead>Cidade</TableHead>
               <TableHead>CEP</TableHead>
              <TableHead>Data da Compra</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loadingData ? (
               <tr>
                  <td colSpan={999} className="p-6 text-center text-muted-foreground">
                    Carregando...
                  </td>
               </tr>
            ): expenses.length == 0 ? (
              <tr>
                  <td colSpan={999} className="p-6 text-center text-muted-foreground">
                    Nenhum dado encontrado.
                  </td>
               </tr>
            ):
              <>
              {filteredExpenses.map((item, i) => {
                return (
                  <Dialog  open={openEditIndex === i} onOpenChange={(open) => setOpenEditIndex(open ? i : null)}  key={i}>
                    <DialogTrigger asChild>
                      <TableRow className='cursor-pointer'>              
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.value}</TableCell>
                        <TableCell>{item.categoryName}</TableCell>
                        <TableCell>{item.paymentTypeDescription}</TableCell>
                        <TableCell>{item.city}</TableCell>
                        <TableCell>{item.zipCode}</TableCell>
                        <TableCell>{formatDateTime(item.buyDate)}</TableCell>                        
                      </TableRow>
                    </DialogTrigger>
                    <DialogContent className="max-h-[90vh] overflow-y-auto">
                      <EditExpenseComponent 
                        setParentOpen={setOpenEditIndex.bind(null, null)}
                        expense={item}
                        onReloadExpenses = {loadExpensesFromThisMonth}
                      />
                    </DialogContent>
                  </Dialog>
                );
              })}         
            </>
            }               
          </TableBody>
        </Table>        
      </div>
      <p className="text-sm text-muted-foreground italic mt-1">Todos os dados mostrados são referentes ao mês atual.</p>
    </div>
  )
}

