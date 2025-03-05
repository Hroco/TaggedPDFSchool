import { NextResponse } from "next/server";
import data from "~/assets/taggsDB.json";

export async function GET() {
  return NextResponse.json(data);
}
