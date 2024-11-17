import { getExpenseById } from '@/api';
import ExpenseDetails from '@/components/expense-details';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
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
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">Spendlog</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/expenses">Expenses</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{expense.atcud ?? '?'}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col p-6">
        <ExpenseDetails expense={expense} />
      </div>
    </>
  );
}
