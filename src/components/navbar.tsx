import { UserButton } from "@clerk/nextjs";
import NavMenu from "@/components/nav-menu";

export default function NavBar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex space-x-4">
          <button className="bg-blue-400">Change store</button>
          <NavMenu />
        </div>
        <div className="flex items-center justify-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
}
