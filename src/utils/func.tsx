"use client";

function returnUrl(query: string, searchEngine: string) {
    switch (searchEngine) {
        case "google":
            return "https://www.google.com/search?q=" + encodeURIComponent(query);
        case "bing":
            return "https://www.bing.com/search?q=" + encodeURIComponent(query);
        case "duckduckgo":
            return "https://duckduckgo.com/?q=" + encodeURIComponent(query);
        case "startpage":
            return "https://www.startpage.com/sp/search?q=" + encodeURIComponent(query);
        default:
            return searchEngine + encodeURIComponent(query);
    }
}

function appendHttp(val: string) {
    const url = (val.startsWith("https://") || val.startsWith("http://")) ?
        val : `https://${val}`;
    return url;
}

function isValidUrl(val: string) {
    const pattern = /^[^\s]+\.[^\s]+$/;
    return pattern.test(val);
}

export function openUrl(url: string) {
    const sameTab = localStorage.getItem("same_tab_search");
    if (sameTab) {
        window.location.href = url;
    } else {
        window.open(url, "_blank", "noopener,noreferrer")
    }
}
export function SearchNow(query: string) {
    if (isValidUrl(query)) {
        openUrl(appendHttp(query));
    } else {

    }
    const searchEngine = localStorage.getItem("search_engine");
    let searchUrl;
    if (searchEngine) {
        searchUrl = returnUrl(query, searchEngine)
    } else {
        searchUrl = returnUrl(query, "google");
        localStorage.setItem("search_engine", "google");
    }
    openUrl(searchUrl);
}