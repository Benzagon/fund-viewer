const fetchBtc = async () => {
    const res = await fetch('http://localhost:3000/api/get-btc-price');
    if(!res.ok) throw new Error('Failed to fetch BTC price');
    return await res.json();
}

export default async function BtcPrice() {
    const btcPrice = await fetchBtc();
    return (
        <>
            <h1>{`Current BTC price is: `}<span className="font-medium">{`${btcPrice.price || ''} USD`}</span></h1>
        </>
    )
}