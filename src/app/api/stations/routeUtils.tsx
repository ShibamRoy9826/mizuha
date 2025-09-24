import { getCHData } from "@/utils/chillhopUtils";
import { songItem } from "@/utils/type"

async function getCHStation(stationId: number) {
    // get songs for a station
    const response = await fetch(`https://streams.chillhop.com/live/${stationId}`)
    const data = await response.json();

    const songData = await data.map(
        (song: songItem) => ({
            artists: song.artists,
            title: song.title,
            endpoint: `https://stream.chillhop.com/mp3/${song.id}`,
            image: song.image,
            label: 'Chillhop Music',
            spotifyId: song.spotifyId,
            duration: song.duration,
        }));
    return songData;
}

export const stations: Record<number, () => Promise<songItem[]>> = new Proxy({}, {
    get(_, prop) {
        const stationId = Number(prop);
        if (stationId >= 10000 && stationId < 20000) {
            return () => getCHStation(stationId);
        }
        return undefined;
    },
    has(_, prop) {
        const stationId = Number(prop);
        return (stationId >= 10000 && stationId < 20000)
    }
})

