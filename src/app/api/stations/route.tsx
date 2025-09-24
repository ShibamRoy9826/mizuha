import { NextResponse, NextRequest } from "next/server";
import { getCHData } from "@/utils/chillhopUtils";

export async function GET(res: NextRequest) {
    const responses = await getCHData();
    return NextResponse.json(
        {
            stations: responses.stations,
            backgrounds: responses.backgrounds,
            sfx: responses.atmospheres
        },
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}