import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log(req);
  return NextResponse.json({
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  console.log(req.body);
  return NextResponse.json({
    status: 200,
  });
}
