import { processRequest } from "../config/processor-request";
import { URL_BASE_EXPENSE } from "../config/urls-utils";

export interface CreateExpenseResponse {
  success: boolean;
  data: number;  
}

export interface ExpenseRequest{   
  value: number,
  description: string,
  paymentTypeId: number,
  categoryId: number,
  addressId: number,
  buyDate: string,
}

export const createNewExpense = async (payload: ExpenseRequest): Promise<CreateExpenseResponse> => {   
  return processRequest<number>(URL_BASE_EXPENSE, "", {
    method: "POST",
    body: payload,
  });
};
