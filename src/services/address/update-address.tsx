import { processRequest } from "../config/processor-request";
import { URL_BASE_EXPENSE } from "../config/urls-utils";

export interface CreateAddressResponse {
  success: boolean;
  data: number;  
}

export interface AddressRequest{   
    state: string,
    zipCode: string,
    city: string,
    district: string,
    street: string,
    number: string,
    complement: string,
}

export const updateAddress = async (idAddress: number, payload: AddressRequest): Promise<CreateAddressResponse> => {    
  return processRequest<number>(URL_BASE_EXPENSE, `/enderecos/${idAddress}`, {
    method: "PUT",
    body: payload,
  });
};
