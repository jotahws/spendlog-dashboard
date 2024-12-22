'use client';

import { TrendingDown, TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Expense } from '@/types/Expense';
import { DailyTotal, getTotalsByPeriod } from '@/utils/expenseUtils';
import moment from 'moment';
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

const chartConfig = {
  total: {
    label: 'Total',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

interface Props {
  expenses: Expense[];
}

type Period = 'daily' | 'weekly' | 'monthly' | 'yearly';

type PeriodStrings = {
  [K in Period]: string;
};

export function PeriodChart({ expenses }: Props) {
  const defaultPeriod: Period = 'daily';
  const periodStrings: PeriodStrings = {
    daily: 'Day',
    weekly: 'Week',
    monthly: 'Month',
    yearly: 'Year',
  };

  const [data, setData] = React.useState<DailyTotal[]>(
    getTotalsByPeriod({
      expenses,
      period: defaultPeriod,
      startDate: new Date(),
    })
  );
  const [period, setPeriod] = React.useState<Period>(defaultPeriod);

  const handleTabChange = (value: Period) => {
    setPeriod(value);
    setData(
      getTotalsByPeriod({ expenses, period: value, startDate: new Date() })
    );
  };

  const getPeriodDateLabel = (date: Date) => {
    switch (period) {
      case 'daily':
        return moment(date).format('ddd');
      case 'weekly':
        return moment(date).format('DD/MM');
      case 'monthly':
        return moment(date).format('MM/YY');
      case 'yearly':
        return moment(date).format('YYYY');
      default:
        return '';
    }
  };

  const lastItem = data[data.length - 1];
  const previousItems = data.slice(0, -1);
  const previousTotal = previousItems.reduce(
    (total, item) => total + item.total,
    0
  );
  const previousAverage = previousTotal / previousItems.length;

  const isTrendingUp = lastItem.total > previousAverage;
  const percentageChange =
    ((lastItem.total - previousAverage) / previousAverage) * 100;

  const TrendingIcon = isTrendingUp ? TrendingUp : TrendingDown;

  const trendText = isTrendingUp
    ? `Current ${periodStrings[period]} is up by ${percentageChange.toFixed(
        1
      )}%`
    : `Current ${periodStrings[period]} is down by ${percentageChange.toFixed(
        1
      )}%`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Insights</CardTitle>
        <CardDescription>Your {period} expenses.</CardDescription>
        <Tabs defaultValue={defaultPeriod}>
          <TabsList className="mt-2">
            <TabsTrigger value="daily" onClick={() => handleTabChange('daily')}>
              Day
            </TabsTrigger>
            <TabsTrigger
              value="weekly"
              onClick={() => handleTabChange('weekly')}
            >
              Week
            </TabsTrigger>
            <TabsTrigger
              value="monthly"
              onClick={() => handleTabChange('monthly')}
            >
              Month
            </TabsTrigger>
            <TabsTrigger
              value="yearly"
              onClick={() => handleTabChange('yearly')}
            >
              Year
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <ChartContainer
        config={chartConfig}
        className="min-h-[200px] w-full mb-2"
      >
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={getPeriodDateLabel}
          />
          <YAxis
            dataKey="total"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="total" fill="var(--color-total)" radius={4} />
        </BarChart>
      </ChartContainer>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {trendText}
              <TrendingIcon />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {getPeriodDateLabel(data[0].date)} -{' '}
              {getPeriodDateLabel(data[data.length - 1].date)}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
