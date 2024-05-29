import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Cart from "./Cart";

export default function NavBar() {
  return (
    <nav className="fixed top-0 w-full z-10 flex items-center justify-between py-4 px-8 bg-slate-800 text-gray-400">
      <Link
        href={"/"}
        className="uppercase font-bold flex items-center text-md h-12"
      >
        Next Store
      </Link>
      <div className="flex items-center gap-8 text-white">
        <Cart />
        <SignedOut>
          <SignInButton>
            <div className="border-2 border-gray-400 p-3 rounded-lg text-gray-400 cursor-pointer hover:border-white hover:text-white transition-all duration-300">
              Fazer Login
            </div>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
