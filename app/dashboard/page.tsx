//Learn about server components --> where we can access our db and other server component

import { getServerSession } from "next-auth";
import db from '@/app/db'
import ProfileCard from "../components/ProfileCard";
import { authConfig } from "../lib/auth";

async function getBalance() {
    const session = await getServerSession(authConfig)
    db.solWallet.findFirst({
        where: {
            userId: session?.user?.uid
        }
    })
}

export default async function() {
    return <div>
        <ProfileCard />
    </div>
}