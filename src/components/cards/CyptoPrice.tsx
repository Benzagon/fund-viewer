import ethImg from '../../../public/icons/eth.svg';
import btcImg from '../../../public/icons/btc.svg';
import Image, { StaticImageData } from 'next/image';
import { FC } from 'react';
import { PorcentagePillNobg } from '../pills/PorcentagePill';
import { percentage } from '@/lib/utils';
import { LargeDataCard } from './DataCard';
import { fetchBtc } from '@/lib/fetchBtc';

interface CryptoCardProps {
    image: StaticImageData;
    short: string;
    coin: string;
    currentPrice: number;
    entryPrice?: number;
}

const CryptoCard: FC<CryptoCardProps> = ({ image, short, coin, currentPrice, entryPrice }) => {
    return (
        <div className='flex w-full h-fit justify-between items-center'>
            <div className='flex gap-[14px] h-full items-center'>
                <Image className='3xl:w-10 w-8' src={image} alt={coin + ' icon'} />
                <div className='flex flex-col h-full justify-between gap-2 leading-[14px] font-normal'>
                    <h2 className='3xl:text-xl text-base'>{short}</h2>
                    <h3 className='3xl:text-base text-sm text-fund-text-gray'>{coin}</h3>
                </div>
            </div>
            <div className='flex flex-col h-full justify-between gap-2 items-end'>
                <h2 className='leading-5 font-medium 3xl:text-xl text-base'>{'$' + Number(currentPrice.toFixed(2)).toLocaleString()}</h2>
                {entryPrice && (
                    <PorcentagePillNobg value={percentage(currentPrice, entryPrice)}/>
                )}
            </div>
        </div>
    );
}

export default async function CryptoPrice({btcPriceEntry, pnl}: {btcPriceEntry: number, pnl: number}) {
    const prices = await fetchBtc();
    return (
        <div className="bg-white h-fit 3xl:p-[30px] p-6 rounded-[10px] flex flex-col gap-5 w-full drop-shadow-md">
            <CryptoCard image={btcImg} short={'BTC'} coin={'Bitcoin'} currentPrice={prices.btcPrice} entryPrice={btcPriceEntry}/>
            <CryptoCard image={ethImg} short={'ETH'} coin={'Ethereum'} currentPrice={prices.ethPrice}/>
        </div>
    )
}