import BillboardsForm from "@/components/billboards-form";
import prismadb from "@/lib/prismadb";

export default async function Billboard({
  params,
}: {
  params: { billboardId: string };
}) {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <>
      <BillboardsForm initialData={billboard} />
    </>
  );
}
