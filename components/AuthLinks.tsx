"use client"
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import React from 'react'


const AuthLinks = () => {
    const { status } = useSession();
    return (
        <div>
            {status === "unauthenticated" ? (<Link href="/api/auth/signin" className="text-2xl hover:underline">
                Login
            </Link>) : (
                <button onClick={() => signOut()} className="text-2xl hover:underline">Logout</button>
            )}
        </div>
    )
}

export default AuthLinks;