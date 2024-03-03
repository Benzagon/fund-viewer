'use client';

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function Signout() {
    return (
        <Button onClick={() => signOut()}>Signout</Button>
    )
}