"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DataTable from "@/components/data-table";

import { BillboardsColumn, columns } from "./columns";

interface BillboardClientProps {
  data: BillboardsColumn[];
}

export default function BillboardClient({ data }: BillboardClientProps) {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboards for your store"
        />
        <Button
          onClick={() =>
            router.push(`/stores/${params.storeId}/billboards/new`)
          }
        >
          <Plus className="mr-2 h-4 w-4" /> Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} filterKeyword="label" />
    </>
  );
}
