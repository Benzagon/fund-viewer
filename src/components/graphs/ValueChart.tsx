'use client';
import { LineChart } from '@tremor/react';
import { useMediaQuery } from 'react-responsive';

const chartdata = [
  {
    date: 'May 2021',
    'BTC % Change': 0.00,
    'KBI % Change': 0.00
  },
  {
    date: 'Jun 2021',
    'BTC % Change': -31.87,
    'KBI % Change': -21.44
  },
  {
    date: 'Jul 2021',
    'BTC % Change': -33.78,
    'KBI % Change': -23.13
  },
  {
    date: 'Aug 2021',
    'BTC % Change': -21.76,
    'KBI % Change': -15.11
  },
  {
    date: 'Sep 2021',
    'BTC % Change': -8.84,
    'KBI % Change': 1.36
  },
  {
    date: 'Oct 2021',
    'BTC % Change': -21.88,
    'KBI % Change': -12.18
  },
  {
    date: 'Nov 2021',
    'BTC % Change': 15.07,
    'KBI % Change': 21.80
  },
  {
    date: 'Dec 2021',
    'BTC % Change': 8.60,
    'KBI % Change': 2.41
  },
  {
    date: 'Jan 2022',
    'BTC % Change': -11.37,
    'KBI % Change': -1.14
  },
  {
    date: 'Feb 2022',
    'BTC % Change': 28.11,
    'KBI % Change': -18.58
  },
  {
    date: 'Mar 2022',
    'BTC % Change': 18.97,
    'KBI % Change': -14.70
  },
  {
    date: 'Apr 2022',
    'BTC % Change': -13.60,
    'KBI % Change': -2.76
  },
  {
    date: 'May 2022',
    'BTC % Change': -27.77,
    'KBI % Change': -19.43
  },
  {
    date: 'Jun 2022',
    'BTC % Change': -43.51,
    'KBI % Change': -46.08
  },
  {
    date: 'Jul 2022',
    'BTC % Change': -63.94,
    'KBI % Change': -64.12
  },
  {
    date: 'Aug 2022',
    'BTC % Change': -57.08,
    'KBI % Change': -54.33
  },
  {
    date: 'Sep 2022',
    'BTC % Change': -62.51,
    'KBI % Change': -57.26
  },
  {
    date: 'Oct 2022',
    'BTC % Change': -63.71,
    'KBI % Change': -61.94
  },
  {
    date: 'Nov 2022',
    'BTC % Change': -62.31,
    'KBI % Change': -57.28
  },
  {
    date: 'Dec 2022',
    'BTC % Change': -68.03,
    'KBI % Change': -66.60
  },
  {
    date: 'Jan 2023',
    'BTC % Change': -68.90494325,
    'KBI % Change': -68.01690075
  },
  {
    date: 'Feb 2023',
    'BTC % Change': -45.48,
    'KBI % Change': -49
  },
  {
    date: 'Mar 2023',
    'BTC % Change': -42.43,
    'KBI % Change': -43.27
  },
  {
    date: 'Apr 2023',
    'BTC % Change': -49.27,
    'KBI % Change': -50.70
  },
  {
    date: 'May 2023',
    'BTC % Change': -43.45,
    'KBI % Change': -48.07
  },
  {
    date: 'Jun 2023',
    'BTC % Change': -45.27,
    'KBI % Change': -48.65
  },
  {
    date: 'Jul 2023',
    'BTC % Change': -51.58,
    'KBI % Change': -54.69
  },
  {
    date: 'Aug 2023',
    'BTC % Change': -51.78,
    'KBI % Change': -55.05
  },
  {
    date: 'Sep 2023',
    'BTC % Change': -30.15,
    'KBI % Change': -40.41
  },
  {
    date: 'Oct 2023',
    'BTC % Change': -30.89,
    'KBI % Change': -40.28
  },
  {
    date: 'Nov 2023',
    'BTC % Change': -21.67,
    'KBI % Change': -34.10
  },
  {
    date: 'Dec 2023',
    'BTC % Change': -15.31,
    'KBI % Change': -23.06
  },
  {
    date: 'Jan 2024',
    'BTC % Change': 17.10,
    'KBI % Change': 2.05
  }
];



const valueFormatter = function (number: number) {
  return new Intl.NumberFormat('us').format(number).toString() + '%';
};

export default function ValueChart() {
  const isMobile = useMediaQuery({ query: `(max-width: 640px)` });

  return (
    <div className='w-full md:h-56 h-44 sm:text-base text-sm'>
      <LineChart
        className="h-full"
        data={chartdata}
        index="date"
        yAxisWidth={!isMobile ? 65 : 34}
        startEndOnly={!isMobile ? false : true}
        showAnimation={true}
        categories={['BTC % Change', 'KBI % Change']}
        colors={['red', 'indigo']}
        valueFormatter={valueFormatter}
      />
    </div>
  );
};