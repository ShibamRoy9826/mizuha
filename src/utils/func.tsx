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
export function SearchNow(query: string) {
    const searchEngine = localStorage.getItem("search_engine");
    let searchUrl;
    if (searchEngine) {
        searchUrl = returnUrl(query, searchEngine)
    } else {
        searchUrl = returnUrl(query, "startpage")
    }
    const sameTab = localStorage.getItem("same_tab_search");
    if (sameTab) {
        window.location.href = searchUrl;
    } else {
        window.open(searchUrl, "_blank", "noopener,noreferrer")
    }
}