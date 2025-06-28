import { processRequest } from "../config/processor-request";
import { URL_BASE_EXPENSE } from "../config/urls-utils";
import type { PaymentType } from "./models/PaymentType";

export interface PaymentTypeResponse {
  success: boolean;
  data: PaymentType[];
}

export const getAllPaymentTypes = async (): Promise<PaymentTypeResponse> => {
  return processRequest<PaymentType[]>(URL_BASE_EXPENSE, "/tipo-pagamentos");
};
