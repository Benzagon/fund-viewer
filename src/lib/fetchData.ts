export const fetchTokenData = async (id: string) => {
    const res = await fetch(`${process.env.HOST}api/get-user-token-data/?id=${id}`);
    if(!res.ok) throw new Error('Failed to fetch user token data');
    return await res.json();
}

export const fetchTokenValue = async (fundId: string) => {
    const res = await fetch(`${process.env.HOST}api/get-token-value/?fundId=${fundId}`);
    if(!res.ok) throw new Error('Failed to fetch user token data');
    return await res.json();
}