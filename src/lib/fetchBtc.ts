export const fetchBtc = async () => {
    const res = await fetch('http://localhost:3000/api/get-btc-price');
    if(!res.ok) throw new Error('Failed to fetch BTC price');
    return await res.json();
}