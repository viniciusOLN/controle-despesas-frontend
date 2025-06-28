import React from "react"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { STATES_BRASIL } from "@/utils/states"

export function AddressForm(){
  const [zipCode, setZipCode] = React.useState("")
  const [stateAddress, setStateAddress] = React.useState("")
  const [city, setCity] = React.useState("")
  const [district, setDistrict] = React.useState("")
  const [street, setStreet] = React.useState("")
  const [number, setNumber] = React.useState("")
  const [complement, setComplement] = React.useState("")
  const [showAddressFields, setShowAddressFields] = React.useState(false)
  const [autoFilledFields, setAutoFilledFields] = React.useState<Record<string, boolean>>({})   
  
  React.useEffect(() => {
    const clean = zipCode.replace(/\D/g, "")
    if (clean.length === 8) {
        handleZipCodeBlur()
    }
  }, [zipCode])


  function formatZipCode(value: string): string {
    const onlyDigits = value.replace(/\D/g, "").slice(0, 8)
    if (onlyDigits.length <= 5) return onlyDigits
        return `${onlyDigits.slice(0, 5)}-${onlyDigits.slice(5)}`
    }


  async function handleZipCodeBlur() {
    const cleanZipCode = zipCode.replace(/\D/g, "")
    if (cleanZipCode.length !== 8) return

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanZipCode}/json/`)
      const data = await res.json()

       setShowAddressFields(true)

      if (data.erro) {
        setStateAddress("")
        setCity("")
        setDistrict("")
        setStreet("")       
      }else{
        setStateAddress(data.uf || "")
        setCity(data.localidade || "")
        setDistrict(data.bairro || "")
        setStreet(data.logradouro || "")
        setAutoFilledFields({
            state: !!data.uf,
            city: !!data.localidade,
            district: !!data.bairro,
            street: !!data.logradouro,
        })        
      }      
    } catch (err) {
      console.error("Erro ao buscar CEP:", err)
      setShowAddressFields(true)      
    }
  }

  return (
    <>
        <div className="grid grid-cols-4 items-center gap-3">                
                <Label htmlFor="cep">CEP</Label>
                <Input
                    className="col-span-3"
                    id="cep"
                    placeholder="CEP"
                    value={zipCode}
                    onChange={(e) => {
                        const formatted = formatZipCode(e.target.value)
                        setZipCode(formatted)
                    }}
                />
            </div>
            {showAddressFields && (
                <>
                    <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="uf">Estado (UF)</Label>
                        <Select value={stateAddress} onValueChange={setStateAddress} disabled={autoFilledFields["state"]}>
                            <SelectTrigger className="col-span-3" id="uf">
                                <SelectValue placeholder="Selecione o estado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Estados</SelectLabel>
                                    {STATES_BRASIL.map((state) => (
                                        <SelectItem key={state.acronym} value={state.acronym}>
                                            {state.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>                
                    </div>
                    <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="cidade">Cidade</Label>
                        <Input
                            className="col-span-3"
                            id="cidade"
                            placeholder="Cidade"
                            value={city}
                            disabled={autoFilledFields["city"]}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="bairro">Bairro</Label>
                        <Input
                            className="col-span-3"
                            id="bairro"
                            placeholder="Bairro"
                            value={district}
                            disabled={autoFilledFields["district"]}
                            onChange={(e) => setDistrict(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="logradouro">Rua (Logradouro)</Label>
                        <Input
                            className="col-span-3"
                            id="logradouro"
                            placeholder="Logradouro"
                            value={street}
                            disabled={autoFilledFields["street"]}
                            onChange={(e) => setStreet(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="numero">Número</Label>
                        <Input
                            className="col-span-3"
                            id="numero"
                            placeholder="Número"
                            value={number}
                            disabled={autoFilledFields["number"]}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-3">
                        <Label htmlFor="complemento">Complemento</Label>
                        <Input
                            className="col-span-3"
                            id="complemento"
                            placeholder="Complemento"
                            value={complement}                            
                            onChange={(e) => setComplement(e.target.value)}
                        />
                    </div>
                </>
            )}     
    </>
  )
}