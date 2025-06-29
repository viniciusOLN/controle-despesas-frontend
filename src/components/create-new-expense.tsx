import * as React from "react"
import {
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog"
import { DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { toast } from "sonner"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import AddressForm, { type AddressFormHandle } from "./address-form"
import { getAllExpenseCategories } from "@/services/category/get-all-categories-expense"
import type { Category } from "@/services/category/models/Category"
import { getAllPaymentTypes } from "@/services/type-payment/get-all-payment-types-expense"
import type { PaymentType } from "@/services/type-payment/models/PaymentType"
import { createNewAddress, type AddressRequest } from "@/services/address/create-new-address"
import { createNewExpense, type ExpenseRequest } from "@/services/expense/create-new-expense"

interface NewExpenseComponentProps {
  setParentOpen: React.Dispatch<React.SetStateAction<boolean>>
  onReloadExpenses: () => Promise<void>
}

export function NewExpenseComponent({ setParentOpen, onReloadExpenses }: NewExpenseComponentProps) {
  const addressRef = React.useRef<AddressFormHandle>(null)
  const [description, setDescription] = React.useState("")
  const [buyDate, setBuyDate] = React.useState("");
  const [value, setValue] = React.useState("")
  const [categories, setCategories] = React.useState<Category[]>([])   
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<string | undefined>()
  const [paymentTypes, setpaymentTypes] = React.useState<PaymentType[]>([])  
  const [selectedTypePayment, setSelectedTypePayment] = React.useState<string | undefined>()
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingSave, setIsLoadingSave] = React.useState(false);


 async function loadCategories() {
  try {
    const { success, data } = await getAllExpenseCategories();

    if (success) {
      if (data.length === 0) {
        toast("Nenhuma categoria encontrada.");
      } else {
        setCategories(data);
      }
    } else {
      console.error("Erro ao carregar categorias");
      toast("Erro ao carregar categorias");
    }
  } catch (error) {
    console.error("Erro inesperado ao carregar categorias:", error);
    toast("Erro inesperado ao carregar categorias.");
  }
 }
 

  async function loadPaymentTypes() {
    try {
        const { success, data } = await getAllPaymentTypes();
        
        if (success) {
            if (data.length === 0) {
                toast("Nenhum tipo de pagamento encontrado.");
            } else {
                setpaymentTypes(data);
            }
        } else {
            console.error("Erro ao carregar tipo de pagamentos");
            toast("Erro ao carregar tipos de pagamento");
        }
    } catch (error) {
        console.error("Erro inesperado ao carregar tipo de pagamentos:", error);
        toast("Erro inesperado ao carregar tipo de pagamentos.");
    }
  }


  async function createNewAddressRequest(request: AddressRequest): Promise<number> {
    try {
        const { success, data } = await createNewAddress(request);
        
        if (success) {
            if (data) {
                return data;
            } else {
                toast("Endereço inválido ou resposta inesperada.");
            }
        } else {
            console.error("Erro ao adicionar endereço.");
            toast("Não foi possível adicionar novo endereço.");
            setIsLoadingSave(false)
        }
    } catch (error) {
        console.error("Erro inesperado ao criar endereço:", error);
        toast("Erro inesperado ao tentar adicionar o endereço.");
        setIsLoadingSave(false)
    }

    return -1;
  }

  async function createNewExpenseRequest(addressId: number) {
    try {
        const expenseRequest: ExpenseRequest = {
            addressId: addressId,
            categoryId: Number.parseInt(selectedCategoryId ?? "0"),
            paymentTypeId: Number.parseInt(selectedTypePayment ?? "0"),
            description: description,
            value: Number.parseInt(value ?? "0"),
            buyDate: new Date(buyDate).toISOString(),
        };

        const { success, data } = await createNewExpense(expenseRequest);

        if (success) {
            if (data) {
                toast("Despesa adicionada com sucesso!");
            } else {
                toast("Resposta inesperada ao adicionar a despesa.");
            }
        } else {
            console.error("Erro ao adicionar despesa.");
            toast("Não foi possível adicionar nova despesa.");
        }
    } catch (error) {
        console.error("Erro inesperado ao criar despesa:", error);
        toast("Erro inesperado ao tentar adicionar a despesa.");
    }
 }

  React.useEffect(() => {
    async function fetchData() {
        setIsLoading(true);
        await Promise.all([loadCategories(), loadPaymentTypes()]);
        setIsLoading(false);
    }

    fetchData();
  }, [])

  function validateForm(): { [key: string]: string } {
    const newErrors: { [key: string]: string } = {};

    if (!buyDate) {
        newErrors.buyDate = "Data da compra é obrigatória.";
    }

    if (!description.trim()) {
        newErrors.description = "Descrição é obrigatória.";
    }
    if (!value.trim() || isNaN(Number(value)) || Number(value) <= 0) {
        newErrors.value = "Valor deve ser um número maior que zero.";
    }
    if (!selectedCategoryId) {
        newErrors.category = "Selecione uma categoria.";
    }
    if (!selectedTypePayment) {
        newErrors.paymentType = "Selecione o tipo de pagamento.";
    }

    if (!addressRef.current) {
        newErrors.address = "Endereço não preenchido.";
    } else {
        const address = addressRef.current.getAddressData();
        if (!address.zipCode?.trim()) newErrors.zipCode = "CEP é obrigatório.";
        if (!address.city?.trim()) newErrors.city = "Cidade é obrigatória.";
        if (!address.state?.trim()) newErrors.state = "Estado é obrigatório.";
        if (!address.street?.trim()) newErrors.street = "Rua é obrigatória.";
        if (!address.number?.trim()) newErrors.number = "Número é obrigatório.";
    }

    return newErrors;
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
        toast.error("Por favor, verifique todos os campos.");       
        return;
    }
    
    setIsLoadingSave(true);

    try {
        if (addressRef.current) {
            const address = addressRef.current.getAddressData();
            const addressId = await createNewAddressRequest({
                zipCode: address.zipCode.replace(/[-.]/g, ''),
                city: address.city,
                complement: address.complement,
                district: address.district,
                number: address.number,
                state: address.state,
                street: address.street,
            });

            if (addressId != -1) {
                await createNewExpenseRequest(addressId);
                await onReloadExpenses();
                setParentOpen(false);
            } else {
                toast.error("Não foi possível salvar o endereço.");
            }
        }
    } catch (error) {
        console.error(error);
        toast.error("Erro inesperado.");
    } finally {
        setIsLoading(false);
    }
}

  return (
    <>
        <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-foreground">Nova Despesa</DialogTitle> 
            <DialogDescription></DialogDescription>
            <div className="h-px bg-muted mt-2 mb-1" />             
        </DialogHeader>
        <h2 className="text-lg font-semibold text-foreground">Despesa</h2>
        <div className="-mt-1 h-px bg-muted w-full" />

        <>
         {isLoading ? (
            <div className="p-6 text-center text-muted-foreground">
                <span className="text-sm">Carregando dados...</span>
            </div>
         ):<>
          <form className="space-y-6">
            <div className="grid grid-cols-4 items-center text-right gap-3"> 
                <Label htmlFor="expense">Descrição</Label>
                <Input 
                    className="col-span-3" 
                    placeholder="Descrição da despesa" 
                    id="name" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-4 items-center text-right gap-3"> 
                <Label htmlFor="value">Valor</Label>
                <Input
                 className="col-span-3" 
                 placeholder="Valor da despesa" 
                 id="value" 
                 type="number"
                 value={value} 
                 onChange={(e) => setValue(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-4 items-center text-right gap-3"> 
                <Label htmlFor="buyDate">Data da compra</Label>
                <Input
                    className="col-span-3"
                    id="buyDate"
                    type="datetime-local"
                    value={buyDate}
                    onChange={(e) => setBuyDate(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-3 ">
                <Label htmlFor="paymentType">Tipo de pagamento</Label>
                <Select value={selectedTypePayment} onValueChange={setSelectedTypePayment}>
                    <SelectTrigger className="col-span-3 w-full" id="paymentType">
                        <SelectValue placeholder="Tipo de pagamento" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectGroup>
                        {paymentTypes.map(type => (
                            <SelectItem key={type.id} value={String(type.id)}>{type.type}</SelectItem>
                        ))}
                    </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="category">Categoria</Label>
                <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
                    <SelectTrigger className="col-span-3 w-full" id="category">
                        <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Tipos</SelectLabel>
                        {categories.map(cat => (
                            <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>
                        ))}
                    </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <h2 className="text-lg font-semibold text-foreground">Endereço</h2>
            <div className="-mt-1 h-px bg-muted w-full" />       
            <AddressForm ref={addressRef}/>
            <DialogFooter>
                <Button className="bg-[var(--personalized)] cursor-pointer" disabled={isLoadingSave} onClick={(e) => handleSubmit(e)}>{isLoadingSave ? "Salvando..." : "Salvar"}</Button>
            </DialogFooter>
        </form>
          </>
        }</>
    </>
  )
}
