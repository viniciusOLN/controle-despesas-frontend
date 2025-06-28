import { processRequest } from "../config/processor-request";
import { URL_BASE_EXPENSE } from "../config/urls-utils";

export interface CreateExpenseResponse {
  success: boolean;
  data: number;  
}

export interface ExpenseRequest{   
  value: number,
  description: string,
  buyDate: string,
  paymentTypeId: number,
  categoryId: number,
  addressId: number,
}

export const updateExpense = async (idExpense: number, payload: ExpenseRequest): Promise<CreateExpenseResponse> => {   
  return processRequest<number>(URL_BASE_EXPENSE, `/${idExpense}`, {
    method: "PUT",
    body: payload,
  });
};
