import { BASE_URL } from "@/baseUrl";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("_page") || "1";
  const limit = searchParams.get("_limit") || "10";

  try {
    const url = `${BASE_URL}?_page=${page}&_limit=${limit}`;
    const res = await fetch(url);

    if (!res.ok) throw new Error("Ошибка при получении постов");

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: `Не удалось загрузить посты, ${error}` },
      { status: 500 }
    );
  }
}



