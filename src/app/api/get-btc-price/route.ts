import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const apiKey = process.env.X_CMC_PRO_API_KEY;
    try {
        const response = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC&convert=USD', {
          headers: {
            'Accept': 'application/json',
            'X-CMC_PRO_API_KEY': apiKey || ''
          },
        })
        const prices = await response.json()
        const btcPrice = prices.data.BTC.quote.USD.price;
        return NextResponse.json({price: btcPrice});  
    } catch (error){
        console.error(error);
    }
}   