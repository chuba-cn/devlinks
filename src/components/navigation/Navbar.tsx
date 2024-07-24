"use client";

import Image from "next/image";
import Link from "next/link";
import IconHeaderLink from "../svg/IconHeaderLink";
import { usePathname } from "next/navigation";
import { BiUserCircle } from "react-icons/bi";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { handleSignOut } from "@/actions/signout.action";
import SubmitButton from "../form/SubmitButton";

function Navbar() {
  const pathName = usePathname();

  return (
    <nav className="p-4">
      <div className="flex justify-between w-full">
        <header>
          <Link href={"/"}>
            <Image
              width={32}
              height={32}
              alt="devlinks logo"
              className="object-contain h-8 w-8 sm:hidden"
              src={"/assets/images/logo-devlinks-small.svg"}
            />
            <Image
              width={146}
              height={32}
              alt="devlinks logo"
              className="object-contain h-8 w-8 sm:hidden"
              src={"/assets/images/logo-devlinks-large.svg"}
            />
          </Link>
        </header>

        <div className="flex gap-2 justify-center">
          <Link
            href={"/"}
            className={`flex gap-2 items-center justify-center flex-nowrap link-tab${
              pathName === "/links" ? " bg-hover-foreground text-primary" : ""
            }`}
          >
            <IconHeaderLink color="currentColor" />{" "}
            <span className="hidden sm:block">Links</span>
          </Link>

          <Link
            href={"/profile"}
            className={`flex gap-2 items-center justify-center flex-nowrap link-tab${
              pathName === "/profile" ? " bg-hover-foreground text-primary" : ""
            }`}
          >
            <BiUserCircle className="text-2xl" />
            <span className="hidden sm:block">Profile</span>
          </Link>

          <form action={handleSignOut} className="flex items-center">
            <SubmitButton
              className="h-10 sm:w-24"
              pendingLabel="Logging out..."
              label="Logout"
            />
          </form>
        </div>

        <div className="flex items-center justify-center">
          <Link
            href={"/preview"}
            className="border text-primary border-primary/60 rounded-[8px] px-4 py-2"
          >
            <MdOutlineRemoveRedEye className="sm:hidden" />
            <span className="hidden sm:block">Preview</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
