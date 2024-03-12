import { PorcentagePill, PorcentagePillNobg } from "../pills/PorcentagePill";

interface Props {
    name: string,
    value: number,
    porcent: number
}

const DataCard = ({name, value, porcent}: Props) => {
    return (
        <div className="3xl:w-80 w-[16rem] 3xl:h-[7.5rem] h-[6.5rem] 3xl:py-[1.625rem] py-[22px] 3xl:px-[22px] p-[18px] bg-white rounded-[10px] flex flex-col justify-between drop-shadow-md">
            <div className="flex gap-3 items-center">
                <h3 className="font-normal 3xl:text-base text-sm text-fund-text-gray">{name}</h3>
                <span className="w-8 3xl:text-xl text-base material-symbols-outlined text-[#5D5D5D]/40">info</span>
            </div>
            <div className="flex gap-2 items-center">
                <h2 className="font-medium 3xl:text-h1 text-2xl">{`$` + Number(value.toFixed(2)).toLocaleString()}</h2>
                <PorcentagePill value={porcent}></PorcentagePill>
            </div>
        </div>
    );
};

const LargeDataCard = ({name, value, porcent}: Props) => {
    return (
        <div className="3xl:w-72 w-[13.75rem] h-full py-[1.625rem] px-[22px] bg-white rounded-[10px] flex flex-col justify-between drop-shadow-md">
            <div className="flex gap-3 items-center">
                <h3 className="font-normal 3xl:text-base text-sm text-fund-text-gray">{name}</h3>
                <span className="w-8 3xl:text-xl text-base material-symbols-outlined text-[#5D5D5D]/40">info</span>
            </div>
            <h2 className="font-medium 3xl:text-h1 text-2xl">{`$` + Number(value.toFixed(2)).toLocaleString()}</h2>
            <PorcentagePillNobg value={porcent}></PorcentagePillNobg>
        </div>
    );
};

export { DataCard, LargeDataCard };