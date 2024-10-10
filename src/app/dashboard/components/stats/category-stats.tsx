'use client';

import { TrendingUp } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
  ReferenceLine,
  Label,
} from 'recharts';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { masteryCutoffs } from '@/lib/constants';

export const description = 'A mixed bar chart';

type CategoryStat = {
  cat: string;
  rating: number;
};

const categoryStats: CategoryStat[] = [
  { cat: 'Arrays & Hashing', rating: 1280 },
  { cat: 'Greedy Algorithms', rating: 890 },
  { cat: '1-D Dynamic Programming', rating: 432 },
  { cat: '2-D Dynamic Programming', rating: 232 },
  { cat: '2-D Dynamic Programming', rating: 173 },
  { cat: '2-D Dynamic Programming', rating: 130 },
  { cat: '2-D Dynamic Programming', rating: 90 },
  { cat: '2-D Dynamic Programming', rating: 40 },
  { cat: '2-D Dynamic Programming', rating: 30 },
];

const getCategoryFill = (cat: CategoryStat) => {
  if (cat.rating < masteryCutoffs.foundations) return 'hsl(var(--chart-1)';
  if (cat.rating < masteryCutoffs.understanding) return 'hsl(var(--chart-3)';
  if (cat.rating < masteryCutoffs.mastery) return 'hsl(var(--chart-2)';
  return 'hsl(var(--chart-4)';
};

const chartConfig = {
  cat: {
    label: 'Category',
  },
  'Arrays & Hashing': {
    label: 'Arrays & Hashing',
  },
  'Greedy Algorithms': {
    label: 'Greedy Algorithms',
  },
  '1-D Dynamic Programming': {
    label: '1-D DP',
  },
  '2-D Dynamic Programming': {
    label: '2-D DP',
  },
} satisfies ChartConfig;

export default function CategoryStats() {
  const chartData = categoryStats.map((cat) => ({
    ...cat,
    fill: getCategoryFill(cat),
  }));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Proficiency Rating by Question Topic</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
            barSize={50}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="cat"
              type="category"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value + ''}
              hide
            />
            <XAxis
              domain={[0, masteryCutoffs.mastery * 1.25]}
              dataKey="rating"
              type="number"
              hide
            />
            <Bar dataKey="rating" layout="vertical" radius={1}>
              <LabelList
                dataKey="cat"
                position="insideLeft"
                className="fill-foreground"
                fontSize={12}
              />
              <LabelList
                dataKey="rating"
                position="insideRight"
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <ReferenceLine
              x={masteryCutoffs.foundations}
              stroke="white"
              opacity={0.5}
            >
              <Label
                position="insideBottom"
                value="Foundations"
                color="white"
                opacity={0.5}
                fill="white"
              />
            </ReferenceLine>
            <ReferenceLine x={masteryCutoffs.understanding} stroke="white">
              <Label
                position="insideBottom"
                value="Understanding"
                color="white"
                opacity={0.5}
                fill="white"
              />
            </ReferenceLine>
            <ReferenceLine x={masteryCutoffs.mastery} stroke="white">
              <Label
                position="insideBottom"
                value="Mastery"
                color="white"
                fill="white"
              />
            </ReferenceLine>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
