export type settingsType = {
    animTime: number;
    windowSpeed: number;
    background: string;
    foreground: string;
    backgroundLighter: string;
    backgroundDarker: string;
    sidebarPos: string;
    searchEngine: string;
    clockEnabled: boolean;
    searchEnabled: boolean;
}

export type songItem = {
    id: string | number;
    artists: string;
    title: string;
    image: string;
    endpoint: string;
    label: "Chillhop Music";
    spotifyId: number;
    duration: number;
}

export type station = {
    id: number,
    name: string,
    meta: string
}

export type background = {
    id: string;
    name: string;
    parentId: string;
    landscapeUrl: string;
    portraitUrl: string;
    thumbnailUrl: string;
    sortOrder: number;
    isActive: number
}

//atmostpheres thingy
export type sfx = {
    id: string,
    name: string,
    url: string,
    sortOrder: number;
    urlMobile: string;
}

export type CHData = {
    stations: station[];
    atmospheres: sfx[];
    backgrounds: background[]
}

export type note = {
    title: string;
    text: string;
}