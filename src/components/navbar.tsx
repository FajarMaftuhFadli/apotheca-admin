import { UserButton, auth } from "@clerk/nextjs";
import NavMenu from "@/components/nav-menu";
import StoreSwitcher from "@/components/store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

export default async function NavBar() {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex space-x-6">
          <StoreSwitcher items={stores} />
          <NavMenu />
        </div>
        <div className="flex items-center justify-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
}
