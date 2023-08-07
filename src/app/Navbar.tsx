import { SignInButton } from "@/components/buttons";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex flex-row gap-2 justify-between items-center py-4 px-8 bg-slate-800">
      <div>
        <ul className="flex flex-row gap-2 items-center">
          <li>
            <Link href={"/"} className="text-xl">
              Task Management
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex flex-row gap-2 items-center">
          <li>
            <SignInButton />
          </li>
        </ul>
      </div>
    </nav>
  );
}
