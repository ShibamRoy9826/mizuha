import { NextRequest, NextResponse } from "next/server";
import { stations } from "../../stations/routeUtils";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ stationId: string }> }
) {
    const { stationId } = await params;
    const stationIdInt = stationId ? parseInt(stationId) : null;

    if (stationIdInt === null) {
        return new NextResponse("Invalid stationId!", {
            status: 400
        })
    }
    const stationFunc = stations[stationIdInt ?? 0];
    if (stationFunc === null) {
        return new NextResponse("No such station found!", {
            status: 404
        })
    }
    const songs = await stationFunc();

    return NextResponse.json(songs, {
        headers: {
            "ContentType": "application/json"
        }
    })

}