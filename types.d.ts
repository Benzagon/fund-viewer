type User = {
    id?: string,
    email: string,
    name: string,
    tokens: number,
    usdInvested: number,
    tokenValEntry: number,
    btcPriceEntry: number,
    role?: string,
    fundId: number
}

type Asset = {
    id: string,
    name: string
    value: Float
    coin: "BTC" | "ETH" | "USD" | string
  }