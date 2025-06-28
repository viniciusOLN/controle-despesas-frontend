import { processRequest } from "../config/processor-request";
import { URL_BASE_EXPENSE } from "../config/urls-utils";
import type { Category } from "./models/Category";

export interface CategoryResponse {
  success: boolean;
  data: Category[];  
}

export const getAllExpenseCategories = async (): Promise<CategoryResponse> => {
  return processRequest<Category[]>(URL_BASE_EXPENSE, "/categorias");
};
