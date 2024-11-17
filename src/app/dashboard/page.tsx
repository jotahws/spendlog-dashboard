import { getExpenses } from '@/api';
import { DailyChart } from '@/components/daily-chart';
import { PeriodChart } from '@/components/period-chart';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Expense } from '@/types/Expense';
import {
  calculateTotalAmountByPeriod,
  formatCurrency,
} from '@/utils/expenseUtils';
import { headers } from 'next/headers';
import Link from 'next/link';

export default async function Page() {
  const expenses: Expense[] = await getExpenses();
  const headersList = await headers();
  const locale = headersList.get('accept-language')?.split(',')[0] || 'pt-PT';

  const renderCell = (expense: Expense) => (
    <TableRow key={expense._id}>
      <TableCell className="font-medium">{expense.atcud}</TableCell>
      <TableCell>{formatCurrency(expense.totalAmount, locale)}</TableCell>
      <TableCell>{expense.merchantVatNumber}</TableCell>
      <TableCell>{expense.documentDate?.toLocaleDateString(locale)}</TableCell>
    </TableRow>
  );

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
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <Card className="text-end">
            <CardHeader>
              <CardTitle>Today</CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="text-6xl font-semibold">
                {formatCurrency(
                  calculateTotalAmountByPeriod(expenses, 'day', new Date()),
                  locale
                )}
              </h2>
            </CardContent>
          </Card>
          <Card className="text-end">
            <CardHeader>
              <CardTitle>This month</CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="text-6xl font-semibold">
                {formatCurrency(
                  calculateTotalAmountByPeriod(expenses, 'month', new Date()),
                  locale
                )}
              </h2>
            </CardContent>
          </Card>
          <Card className="text-end">
            <CardHeader>
              <CardTitle>Last month</CardTitle>
            </CardHeader>
            <CardContent>
              <h2 className="text-6xl font-semibold">
                {formatCurrency(
                  calculateTotalAmountByPeriod(
                    expenses,
                    'month',
                    new Date(new Date().setMonth(new Date().getMonth() - 1))
                  ),
                  locale
                )}
              </h2>
            </CardContent>
          </Card>
        </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <PeriodChart expenses={expenses} />
          <Card>
            <CardHeader>
              <CardTitle>Recent</CardTitle>
              <CardDescription>A list of your recent expenses.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ATCUD</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Merchant VAT</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>{expenses.slice(0, 8).map(renderCell)}</TableBody>
              </Table>
            </CardContent>
            <CardFooter className="justify-center">
              <Link href="/expenses">
                <Button variant="outline">See all</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        <DailyChart expenses={expenses} />
      </div>
    </>
  );
}
