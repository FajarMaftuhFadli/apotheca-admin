import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

import BillboardClient from "./billboard-client";
import { BillboardsColumn } from "./columns";

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

  const formattedBillboards: BillboardsColumn[] = billboards.map(
    (billboard) => ({
      id: billboard.id,
      label: billboard.label,
      createdAt: format(billboard.createdAt, "dd MMM yyyy"),
    }),
  );

  return (
    <>
      <BillboardClient data={formattedBillboards} />
    </>
  );
}
