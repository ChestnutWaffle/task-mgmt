"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { LogoutIcon } from "./icons";

export function SignInButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex flex-row gap-2">
        <div className="w-8 h-8 bg-slate-700 animate-pulse rounded"></div>
        <div className="w-8 h-8 bg-slate-700 animate-pulse rounded"></div>
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="flex flex-row gap-2 items-center">
        <Link href="/dashboard">
          <Image
            className="rounded-lg"
            alt="Profile Pic"
            src={session.user?.image ?? "/profile_placeholder.png"}
            width={30}
            height={30}
            title={session.user?.name ?? "User"}
          />
        </Link>
        <SignOutButton />
      </div>
    );
  }
  return <button onClick={() => signIn()}>Sign In</button>;
}
export function SignOutButton() {
  return (
    <button title="Log out" onClick={() => signOut()}>
      <LogoutIcon className="w-6 h-6" />
    </button>
  );
}
