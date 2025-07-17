import tags from "@assets/tagsDB.json";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(tags);
}
