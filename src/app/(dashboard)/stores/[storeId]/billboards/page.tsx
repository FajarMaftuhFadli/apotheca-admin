import BillboardClient from "@/components/billboard-client";
import prismadb from "@/lib/prismadb";

export default async function Billboards({
  params,
}: {
  params: { storeId: string };
}) {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <BillboardClient data={billboards} />
    </>
  );
}
