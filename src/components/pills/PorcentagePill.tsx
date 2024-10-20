import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

const PorcentagePill = ({value}: {value: number}) => {
    if(value >= 0) {
        return (
            <div className="h-fit pr-[8px] pl-[4px] py-[4px] flex items-center rounded-3xl text-fund-text-green bg-fund-text-green/10">
                 <ChevronUpIcon className="w-5 3xl:text-xl text-xl"/>
                 <h3 className="3xl:text-sm text-min font-medium">{`+${value.toFixed(2)}%`}</h3>
            </div>
         );
    }
    return (
        <div className="h-fit pr-[8px] pl-[4px] py-[4px] flex items-center rounded-3xl text-fund-text-red bg-fund-text-red/10">
             <ChevronDownIcon className="w-5 3xl:text-xl text-xl" />
             <h3 className="3xl:text-sm text-min font-medium">{`${value}%`}</h3>
        </div>
     );
};

const PorcentagePillNobg = ({value, large}: {value: number, large?: boolean}) => {
     if(value >= 0) {
         return (
             <div className="h-2 pr-[8px] pl-[4px] flex items-center rounded-3xl text-fund-text-green">
                  <ChevronUpIcon className="w-5 3xl:text-xl text-xl"/>
                  <h3 className={`font-medium ${large ? '3xl:text-base text-sm' : '3xl:text-sm text-min'}`}>{`+${value.toFixed(2)}%`}</h3>
             </div>
          );
     }
     return (
         <div className="h-2 pr-[8px] pl-[4px] flex items-center rounded-3xl text-fund-text-red">
               <ChevronDownIcon className={`w-5`}/>
              <h3 className={`font-medium ${large ? '3xl:text-base text-sm' : '3xl:text-sm text-min'}`}>{`${value}%`}</h3>
         </div>
      );
 };

export { PorcentagePill, PorcentagePillNobg };