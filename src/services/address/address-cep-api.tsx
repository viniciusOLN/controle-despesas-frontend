import { URL_BASE_VIA_CEP } from "../config/urls-utils";

export const getViaCepAddress = async (zipCode: string) => {    
  const res = await fetch(`${URL_BASE_VIA_CEP}/${zipCode}/json/`)
  return  await res.json()
};
