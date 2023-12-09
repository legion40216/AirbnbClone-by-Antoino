import Categories from "./Categories";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

export default function Navbar({
  currentUser,
}) {

  return (
    <header className="container-full">
    <div className="nav-container">
     <Logo/>
     <Search/>
     <UserMenu currentUser={currentUser}/>
     
  </div>
  <Categories/>
  </header>
  )
}
