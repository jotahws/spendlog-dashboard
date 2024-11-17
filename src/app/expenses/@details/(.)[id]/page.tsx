import { getExpenseById } from '@/api';
import ExpenseDetails from '@/components/expense-details';
import Modal from '@/components/modal';
import {
  Expense,
  ExpenseFormatted,
  ExpenseFormattedSchema,
} from '@/types/Expense';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const expenseId = (await params).id;
  const data: Expense = await getExpenseById(expenseId);
  const expense: ExpenseFormatted = ExpenseFormattedSchema.parse(data);

  return (
    <Modal title={'Details'}>
      <ExpenseDetails expense={expense} />
    </Modal>
  );
}
