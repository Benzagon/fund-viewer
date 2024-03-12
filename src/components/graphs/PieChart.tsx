'use client';
import { DonutChart } from '@tremor/react';

const sales = [
  {
    name: 'New York',
    sales: 980,
  },
  {
    name: 'London',
    sales: 456,
  },
  {
    name: 'Hong Kong',
    sales: 390,
  },
  {
    name: 'San Francisco',
    sales: 240,
  },
  {
    name: 'Singapore',
    sales: 190,
  },
];

const valueFormatter = (number: number) =>
  `$ ${Number(number.toFixed(2)).toLocaleString()}`;

export default function PieChart({assets}: {assets?: {name: string, value: number}[]}) {
  return (
    <div className='bg-white w-full h-full rounded-[10px] flex flex-col justify-between drop-shadow-md 3xl:py-[2rem] 3xl:px-[30px] p-6'>
      <h2 className='font-medium 3xl:text-xl text-base'>Portfolio Diversity</h2>
      <h3 className='3xl:text-base text-sm text-fund-text-gray'>View asset allocation</h3>
      {assets && (
        <div className="flex items-center justify-center font-medium 3xl:text-xl text-base">
          <DonutChart
            data={assets}
            category="value"
            index="name"
            valueFormatter={valueFormatter}
            showAnimation={true}
            colors={['yellow', 'gray', 'indigo', 'violet', 'fuchsia']}
            className="3xl:w-64 3xl:h-64 w-48 h-48"
          />
        </div>
      )}
    </div>
  );
};