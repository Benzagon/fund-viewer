'use client';
import { DonutChart } from '@tremor/react';

const colorsHex = ['#808080', '#EAB308', '#4B0082', '#EE82EE', '#FF00FF'];

const AssetTag = ({name, value, color}: {name: string, value: string, color: string}) => {
  return (
    <div className='flex items-center justify-start gap-1 h-6 text-base'>
      <p style={{ color }} className='text-3xl'>•</p>
      <p>
        <span className='font-normal'>{`${name}: `}</span>{value}
      </p>
    </div>
  )
}

export default function PieChart({assets, nav}: {assets?: {name: string, value: number}[], nav: number}) {
  const valueFormatter = (number: number) =>
  `${((number / nav) * 100).toFixed(2)}%`;

  return (
    <div className='bg-white w-full h-full rounded-[10px] flex flex-col justify-between drop-shadow-md 3xl:py-[2rem] 3xl:px-[30px] p-6'>
      <h2 className='font-medium 3xl:text-xl text-base'>Portfolio Diversity</h2>
      <h3 className='3xl:text-base text-sm text-fund-text-gray'>View asset allocation</h3>
      {assets && (
        <div className="flex sm:flex-row flex-col items-center justify-center font-medium 3xl:text-xl text-base gap-8 sm:gap-4 sm:pt-0 pt-4">
          <DonutChart
            data={assets}
            category="value"
            index="name"
            label='Net Assets'
            valueFormatter={valueFormatter}
            showAnimation={true}
            colors={['gray', 'yellow', 'indigo', 'violet', 'fuchsia']}
            className="3xl:w-64 3xl:h-64 w-48 h-48"
          />
          <div className='flex flex-col h-full items-start'>
            {
              assets.map((asset, i) => (
                <AssetTag key={i} name={asset.name} value={valueFormatter(asset.value)} color={colorsHex[i]} />
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
};