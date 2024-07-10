'use client'
import { ModeToggle } from "@/components/mode-toggles";
import { signIn, signOut, useSession } from "next-auth/react";

export function Header() {

    const session = useSession();

    return(
        <header>
            <div>
                {session.data ? (
                    <button onClick={() =>  signOut()}>Sign Out</button>
                ) : (
                    <button onClick={() => signIn('google')}>Sign In</button>
                )}
                {session.data?.user?.name}
                <ModeToggle/>
            </div>
        </header>
    )
}