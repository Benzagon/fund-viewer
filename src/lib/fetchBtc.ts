export const fetchBtc = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/get-btc-price`);
    if(!res.ok) throw new Error('Failed to fetch BTC price');
    return await res.json();
}