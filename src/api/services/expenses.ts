import { Expense, ExpenseListSchema, ExpenseSchema } from '@/types/Expense';
import { api } from '../';

export const getExpenses = async (): Promise<Expense[]> => {
    return api<Expense[], typeof ExpenseListSchema>('/expenses', ExpenseListSchema);
};

export const getExpenseById = async (id: string): Promise<Expense> => {
    return api<Expense, typeof ExpenseSchema>(`/expense/${id}`, ExpenseSchema);
};
