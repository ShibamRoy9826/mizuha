import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ query: string }> }
) {
    const { query } = await params;

    if (!query) {
        return new Response("Missing query", { status: 400 });
    }

    try {
        const url = "http://suggestqueries.google.com/complete/search"
        const params = {
            "hl": "en",
            "q": query,
            "output": "firefox"
        };
        const headers = {
            'User-Agent': 'Mozilla/5.0',
        }
        const searchParams = new URLSearchParams(params).toString();
        const fullUrl = `${url}?${searchParams}`;

        const response = await fetch(fullUrl, {
            headers: headers
        });
        const data = await response.json();

        return NextResponse.json(data);
    } catch (err) {
        return new Response(`Failed to proxy ${err}`, { status: 500 });
    }

}