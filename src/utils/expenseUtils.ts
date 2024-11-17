import { Expense } from '@/types/Expense';

/**
 * Sort expenses by date in descending order (newest first)
 */
export const sortExpensesByDate = (expenses: Expense[]): Expense[] => {
    return [...expenses].sort(
        (a, b) => b.documentDate.getTime() - a.documentDate.getTime()
    );
};

/**
 * Calculate total amount for a list of expenses within a specified period
 * @param expenses List of expenses
 * @param period Period type ('day', 'month', 'year' or 'interval')
 * @param date Reference date for day/month/year calculations
 * @param endDate Optional end date for interval calculations
 */
export const calculateTotalAmountByPeriod = (
    expenses: Expense[],
    period: 'day' | 'month' | 'year' | 'interval',
    date: Date,
    endDate?: Date
): number => {
    const startOfPeriod = new Date(date);
    const endOfPeriod = new Date(endDate || date);

    switch (period) {
        case 'day':
            startOfPeriod.setHours(0, 0, 0, 0);
            endOfPeriod.setHours(23, 59, 59, 999);
            break;
        case 'month':
            startOfPeriod.setDate(1);
            startOfPeriod.setHours(0, 0, 0, 0);
            endOfPeriod.setMonth(endOfPeriod.getMonth() + 1, 0);
            endOfPeriod.setHours(23, 59, 59, 999);
            break;
        case 'year':
            startOfPeriod.setMonth(0, 1);
            startOfPeriod.setHours(0, 0, 0, 0);
            endOfPeriod.setMonth(11, 31);
            endOfPeriod.setHours(23, 59, 59, 999);
            break;
        case 'interval':
            if (!endDate) throw new Error('End date required for interval period');
            startOfPeriod.setHours(0, 0, 0, 0);
            endOfPeriod.setHours(23, 59, 59, 999);
            break;
    }

    return expenses
        .filter(expense =>
            expense.documentDate >= startOfPeriod &&
            expense.documentDate <= endOfPeriod
        )
        .reduce((total, expense) => total + expense.totalAmount, 0);
};

export interface DailyTotal {
    date: Date;
    total: number;
}

export const getTotalsByPeriod = (
    expenses: Expense[],
    period: 'daily' | 'weekly' | 'monthly' | 'yearly',
    startDate: Date,
    customDuration?: number
): DailyTotal[] => {
    let periodDuration: number;
    let periodIncrement: number;

    switch (period) {
        case 'daily':
            periodDuration = customDuration || 10;
            periodIncrement = 1; // Group by days
            break;
        case 'weekly':
            periodDuration = customDuration || 70;
            periodIncrement = 7; // Group by weeks
            break;
        case 'monthly':
            periodDuration = customDuration || 300;
            periodIncrement = 30; // Group by months
            break;
        case 'yearly':
            periodDuration = customDuration || 3650;
            periodIncrement = 365; // Group by years
            break;
        default:
            throw new Error(`Unsupported period: ${period}`);
    }

    const periodTotals: DailyTotal[] = [];
    for (let i = periodDuration - 1; i >= 0; i -= periodIncrement) {
        const periodStart = new Date(startDate);
        periodStart.setDate(startDate.getDate() - i);
        periodStart.setHours(0, 0, 0, 0);
        const periodEnd = new Date(periodStart);
        periodEnd.setDate(periodStart.getDate() + periodIncrement - 1);
        periodEnd.setHours(23, 59, 59, 999);

        const periodExpenses = expenses.filter(expense =>
            expense.documentDate >= periodStart &&
            expense.documentDate <= periodEnd
        );

        const totalAmount = periodExpenses.reduce((total, expense) => total + expense.totalAmount, 0);
        periodTotals.push({ date: periodStart, total: totalAmount });
    }

    return periodTotals;
};

/**
 * Calculate total taxes for an expense
 */
export const calculateTotalTaxes = (expense: Expense): number => {
    return (
        (expense.totalReducedRateVatI || 0) +
        (expense.totalIntermediateRateVatI || 0) +
        (expense.totalNormalRateVatI || 0) +
        (expense.totalReducedRateVatJ || 0) +
        (expense.totalIntermediateRateVatJ || 0) +
        (expense.totalNormalRateVatJ || 0) +
        (expense.totalReducedRateVatK || 0) +
        (expense.totalIntermediateRateVatK || 0) +
        (expense.totalNormalRateVatK || 0) +
        (expense.stampTax || 0)
    );
};

/**
 * Format amount as currency with Euro symbol
 */
export const formatCurrency = (amount?: number, locale: string = 'pt-PT'): string | undefined => {

    return amount?.toLocaleString(locale, {
        style: 'currency',
        currency: 'EUR'
    });
};

/**
 * Parse currency string to number
 */
export const parseCurrency = (currencyString: string): number => {
    // Remove currency symbol, spaces and convert decimal separator
    const normalized = currencyString
        .replace(/[€$\s]/g, '')
        .replace(',', '.');
    return parseFloat(normalized);
};
