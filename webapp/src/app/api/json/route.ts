import tags from "@assets/tagsDB";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(tags);
}
