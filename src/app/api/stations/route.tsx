import { NextResponse } from "next/server";
import { getCHData } from "@/utils/chillhopUtils";

export async function GET() {
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