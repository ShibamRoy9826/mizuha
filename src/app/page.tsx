'use client';
import BottomBar from "@/components/bottomBar";
import SearchBar from "@/components/inputs/searchBar";
import SideBar from "@/components/sidebar";

export default function Home() {
  return (
    <div className="overflow-hidden relative h-screen bg-black-900">
      <SearchBar />
      <SideBar />
      <BottomBar />
    </div>
  );
}
