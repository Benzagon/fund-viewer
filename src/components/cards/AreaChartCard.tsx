import ValueChart from "../graphs/ValueChart"

const AreaChartCard = () => {
    return (
        <div className='bg-white w-full h-full rounded-[10px] flex flex-col justify-between drop-shadow-md 3xl:py-[2rem] 3xl:px-[30px] p-6'>
            <h2 className='font-medium 3xl:text-xl text-base'>Monthly Statistics</h2>
            <h3 className='3xl:text-base text-sm text-fund-text-gray'>Overall Token Statistics</h3>
            <ValueChart></ValueChart>
        </div>
    )
}

export default AreaChartCard;