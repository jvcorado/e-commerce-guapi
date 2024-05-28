import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="fixed top-0 w-full z-50 flex items-center justify-between py-2 px-8 bg-slate-800 text-gray-400">
      <Link
        href={"/"}
        className="uppercase font-bold flex items-center text-md h-12"
      >
        Next Store
      </Link>
      <div className="flex items-center gap-8 text-white">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
