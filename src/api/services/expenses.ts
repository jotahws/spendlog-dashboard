import { Expense, ExpenseListSchema, ExpenseSchema } from '@/types/Expense';
import { api } from '../';

export const getExpenses = async (): Promise<Expense[]> => {
    return api.get<Expense[], typeof ExpenseListSchema>('/expenses', ExpenseListSchema);
};

export const getExpenseById = async (id: string): Promise<Expense> => {
    return api.get<Expense, typeof ExpenseSchema>(`/expense/${id}`, ExpenseSchema);
};
