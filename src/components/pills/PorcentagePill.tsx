const PorcentagePill = ({value}: {value: number}) => {
    if(value >= 0) {
        return (
            <div className="h-fit pr-[8px] pl-[4px] py-[6px] flex items-center rounded-3xl text-fund-text-green bg-fund-text-green/10">
                 <span className="material-symbols-outlined">arrow_drop_up</span>
                 <h3 className="text-sm font-medium">{`+${value}%`}</h3>
            </div>
         );
    }
    return (
        <div className="h-fit pr-[8px] pl-[4px] py-[6px] flex items-center rounded-3xl text-fund-text-red bg-fund-text-red/10">
             <span className="material-symbols-outlined">arrow_drop_down</span>
             <h3 className="text-sm font-medium">{`${value}%`}</h3>
        </div>
     );
};

export { PorcentagePill };