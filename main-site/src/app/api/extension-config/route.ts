import { NextResponse } from "next/server";

export async function GET(request: Request) {
  
  return NextResponse.json({
    chromiumExtId: process.env.NEXT_PUBLIC_EXTENSION_ID,
  });

}
