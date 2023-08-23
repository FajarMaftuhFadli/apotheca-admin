"use client";

import { ColumnDef } from "@tanstack/react-table";

export type BillboardsColumn = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardsColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];