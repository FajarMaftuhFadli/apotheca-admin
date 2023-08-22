import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const body = await req.json();
    const { label, imageUrl } = body;
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!label) return new NextResponse("Missing label", { status: 400 });
    if (!imageUrl) return new NextResponse("Missing imageUrl", { status: 400 });
    if (!params.storeId)
      return new NextResponse("Missing storeId", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 404 });

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARDS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
    if (!params.storeId)
      return new NextResponse("Missing storeId", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 404 });

    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[BILLBOARDS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}