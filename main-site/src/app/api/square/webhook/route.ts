
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  console.log(req.body)
  return NextResponse.json({
    message: "Hello, World!",
    });
}
