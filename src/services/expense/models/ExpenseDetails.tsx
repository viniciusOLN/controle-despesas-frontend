export interface ExpenseDetails{
    id: number,
    value: number,
    description: string,
    buyDate: string,
    paymentTypeId: number,
    paymentTypeDescription: string,
    categoryId: number,
    categoryName: string,
    addressId: number,
    state: string,
    city: string,
    zipCode: string,
    district: string,
    street: string,
    number: string,
    complement: string,
}