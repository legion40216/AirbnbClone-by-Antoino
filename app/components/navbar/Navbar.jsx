'use client'
import { useSession } from "next-auth/react";
import Categories from "./Categories";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { Suspense } from "react";

export default function Navbar() {
  const { status } = useSession();
  return (
    <header className="container-full">
    <div className="nav-container">
     <Logo/>
     <Search/>
     <UserMenu status={status}/>
     
  </div>
  <Suspense>
  <Categories/>
  </Suspense>
  </header>
  )
}
