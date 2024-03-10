import { PorcentagePill, PorcentagePillNobg } from "../pills/PorcentagePill";

interface Props {
    name: string,
    value: number,
    porcent: number
}

const DataCard = ({name, value, porcent}: Props) => {
    return (
        <div className="w-80 h-[7.5rem] py-[1.625rem] px-[22px] bg-white rounded-[10px] flex flex-col justify-between drop-shadow-md">
            <div className="flex gap-3 items-center">
                <h3 className="font-normal text-base text-fund-text-gray">{name}</h3>
                <span className="material-symbols-outlined text-[#5D5D5D]/40">info</span>
            </div>
            <div className="flex gap-3 items-center">
                <h2 className="font-medium text-h1">{`$` + value.toLocaleString()}</h2>
                <PorcentagePill value={porcent}></PorcentagePill>
            </div>
        </div>
    );
};

const LargeDataCard = ({name, value, porcent}: Props) => {
    return (
        <div className="w-80 h-44 py-[1.625rem] px-[22px] bg-white rounded-[10px] flex flex-col justify-between drop-shadow-md">
            <div className="flex gap-3 items-center">
                <h3 className="font-normal text-base text-fund-text-gray">{name}</h3>
                <span className="material-symbols-outlined text-[#5D5D5D]/40">info</span>
            </div>
            <h2 className="font-medium text-h1">{`$` + value.toLocaleString()}</h2>
            <PorcentagePillNobg value={porcent}></PorcentagePillNobg>
        </div>
    );
};

export { DataCard, LargeDataCard };