import { Connection } from "@solana/web3.js"
import axios from "axios";


let LAST_UPDATED : number | null = null;
let prices: {[key : string] : {
    price : string
}} = {};
const TOKEN_PRICE_REFRESH_INTERVAL = 60 * 1000;
export const SUPPORTED_TOKENS : {
    name : string;
    mint : string;
    native : boolean;
    price : string;
    image : string;
}[] = [{
    name : "USDC",
    mint : "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    native : false,
    price : "1",
    image : "https://s2.coinmarketcap.com/static/img/coins/200x200/3408.png"
},{
    name : "USDT",
    mint : "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    native : false,
    price : "1",
    image : "https://s2.coinmarketcap.com/static/img/coins/200x200/825.png"
},{
    name : "SOL",
    mint : "So11111111111111111111111111111111111111112",
    native : false,
    price : "1",
    image : "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"
}
]

export async function getSupportedTokens(){
    if(!LAST_UPDATED || new Date().getTime() - LAST_UPDATED < TOKEN_PRICE_REFRESH_INTERVAL) {
        const response =  await axios.get("https://price.jup.ag/v6/price?ids=SOL,USDC,USDT");
        prices = response.data.data;
        LAST_UPDATED = new Date().getTime()
    }
    return SUPPORTED_TOKENS.map(s => ({
        ...s,
        price : prices[s.name]

    }))
}

getSupportedTokens();

export const connection = new Connection("https://api.mainnet-beta.solana.com")