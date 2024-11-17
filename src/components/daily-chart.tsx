'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
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

export function DailyChart({ expenses }: Props) {
  const period = 'daily';
  const [data, setData] = React.useState<DailyTotal[]>(
    getTotalsByPeriod(expenses, period, new Date())
  );

  const handleTabChange = (duration: number) => {
    setData(getTotalsByPeriod(expenses, period, new Date(), duration));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>History</CardTitle>
        <Tabs defaultValue={'1w'}>
          <TabsList className="mt-2">
            <TabsTrigger value="1w" onClick={() => handleTabChange(7)}>
              1W
            </TabsTrigger>
            <TabsTrigger value="1m" onClick={() => handleTabChange(30)}>
              1M
            </TabsTrigger>
            <TabsTrigger value="6m" onClick={() => handleTabChange(180)}>
              6M
            </TabsTrigger>
            <TabsTrigger value="1y" onClick={() => handleTabChange(365)}>
              1Y
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <ChartContainer config={chartConfig} className="mb-2 h-[300px] w-[100%]">
        <AreaChart data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(date) => moment(date).format('DD/MM')}
          />
          <YAxis
            dataKey="total"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            dataKey="total"
            type="bump"
            fill="var(--color-total)"
            fillOpacity={0.4}
            stroke="var(--color-total)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </Card>
  );
}
