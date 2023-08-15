import SettingsForm from "@/components/settings-form";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

interface SettingsProps {
  params: {
    storeId: string;
  };
}
export default async function Settings({ params }: SettingsProps) {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  if (!store) redirect("/");
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm />
      </div>
    </div>
  );
}
