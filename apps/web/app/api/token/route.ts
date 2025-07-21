// web/app/api/token/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("__Secure-authjs.session-token")?.value;

  if (!token) {
    return NextResponse.json({ token: null }, { status: 401 });
  }

  console.log(token);
  

  return NextResponse.json({ token });
}
