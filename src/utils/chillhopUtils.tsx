import { CHData } from "./type";
import { songItem } from "./type";

export async function getStationSongs(stationId: number) {
    try {
        const response = await fetch(`/api/stream/${stationId}`)
        const data = await response.json();
        return data as songItem[];
    }
    catch (e) {
        console.log("Error occured:", e);
        return [] as songItem[];
    }
}

export async function getStations() {
    try {
        const res = await fetch('/api/stations');
        if (!res.ok) console.log("Couldn't fetch stations");
        const data = (await res.json()) as CHData;
        return data;
    }
    catch (e) {
        console.log("Error occured:", e);
        return {} as CHData;
    }
}

export async function getCHData() {
    const response = await fetch("https://stream.chillhop.com/presets");

    try {
        const data = await response.json();
        return data as CHData;
    } catch (e) {
        console.log("error:", e)
        return {} as CHData;
    }
}