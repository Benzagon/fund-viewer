const fetchBtc = async () => {
    const res = await fetch('http://localhost:3000/api/get-btc-price');
    if(!res.ok) throw new Error('Failed to fetch BTC price');
    return await res.json();
}

export default async function BtcPrice() {
    const prices = await fetchBtc();
    return (
        <>
            <h1>{`Current BTC price is: `}<span className="font-medium">{`${prices.btcPrice || ''} USD`}</span></h1>
            <h1>{`Current ETH price is: `}<span className="font-medium">{`${prices.ethPrice || ''} USD`}</span></h1>
        </>
    )
}