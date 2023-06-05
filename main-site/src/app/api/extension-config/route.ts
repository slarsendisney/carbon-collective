import { NextResponse } from "next/server";

export async function GET() {
  
  return NextResponse.json({
    chromiumExtId: process.env.NEXT_PUBLIC_EXTENSION_ID,
  },{
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });

}
