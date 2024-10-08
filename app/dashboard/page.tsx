//Learn about server components --> where we can access our db and other server component

import { getServerSession } from "next-auth";
import db from '@/app/db'
import ProfileCard from "../components/ProfileCard";
import { authConfig } from "../lib/auth";

async function getUserWallet() {
    const session = await getServerSession(authConfig)
    const userWallet = await db.solWallet.findFirst({
        where: {
            userId: session?.user?.uid
        }, 
        select: {
            publicKey: true
        }
    })
    if(!userWallet){
        return {
            error: "No solana wallet found associated to the user"
        }
    }

    return {error: null, userWallet}
}

export default async function() {
    const userWallet = await getUserWallet();
    if(userWallet?.error || !userWallet.userWallet?.publicKey){
        return <>No solana wallet found</>
    }
    return <div>
        <ProfileCard publicKey={userWallet.userWallet?.publicKey}/>
    </div>
}