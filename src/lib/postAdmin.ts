export const deleteAsset = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/delete-asset?id=${id}`, {
        method: 'DELETE', 
        headers: {
        'Content-Type': 'application/json'
        },
    });
    if(!res.ok) throw new Error('Failed to delete assets');
    return await res.json();
}

export const getTotalTokens = async (fundId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/admin-get-tokens/?fundId=${fundId}`);
    if(!res.ok) throw new Error('Failed to fetch current token amount');
    return await res.json();
}
