import { processRequest } from "../config/processor-request";
import { URL_BASE_EXPENSE } from "../config/urls-utils";
import type { ExpenseDetails } from "./models/ExpenseDetails";

export interface getExpensesResponse {
  success: boolean;
  data: ExpenseDetails[];  
}


export const getExpensesFromCurrentMonth = async (size: number): Promise<getExpensesResponse> => {   
  return processRequest<ExpenseDetails[]>(URL_BASE_EXPENSE, "/by-company-month?page=0&size=" + size);
};
