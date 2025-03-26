import { NextResponse } from "next/server";
import tags from "~/assets/taggsDB";

export async function GET() {
  return NextResponse.json(tags);
}
