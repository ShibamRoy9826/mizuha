import React from "react";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const stationId = request.nextUrl.searchParams;


}