export const fetchTokenData = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/get-user-token-data/?id=${id}`);
    if(!res.ok) throw new Error('Failed to fetch user token data');
    return await res.json();
}

export const fetchTokenValue = async (fundId: string, btcPrice: string, ethPrice: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/get-token-value/?fundId=${fundId}&btc=${btcPrice}&eth=${ethPrice}`);
    if(!res.ok) throw new Error('Failed to fetch current token value');
    return await res.json();
}