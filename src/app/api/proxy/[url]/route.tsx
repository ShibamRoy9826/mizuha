
export async function GET(
    request: Request,
    { params }: { params: Promise<{ url: string }> }
) {
    const { url } = await params;

    if (!url) {
        return new Response("Missing url", { status: 400 });
    }

    try {
        const response = await fetch(url);

        // stream response directly to client
        return new Response(response.body, {
            headers: {
                "Content-Type": response.headers.get("content-type") ?? "audio/mpeg",
                "Cache-Control": "no-cache",
            },
        });
    } catch (err) {
        return new Response("Failed to proxy", { status: 500 });
    }

}