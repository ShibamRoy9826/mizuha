import { CHData } from "./type";

export async function getStationSongs(stationId: number) {
    const response = await fetch(`/api/stream/${stationId}`)
    const data = await response.json();
    return data;
}

export async function getStations() {
    const res = await fetch('/api/stations');
    if (!res.ok) console.log("Couldn't fetch stations");
    const data = (await res.json()) as CHData;
    return data;
}

export async function getCHData() {
    const response = await fetch("https://stream.chillhop.com/presets");

    try {
        const data = await response.json();
        return data;
    } catch (e) {
        console.log("error:", e)
        return undefined;
    }
}