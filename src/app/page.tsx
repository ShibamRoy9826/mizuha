'use client';
import BottomBar from "@/components/bottomBar";
import SearchBar from "@/components/inputs/searchBar";
import Clock from "@/components/modules/clock";
import SideBar from "@/components/sidebar";

export default function Home() {
  return (
    <div className="overflow-hidden relative h-screen bg-black-900">
      <Clock />
      <SearchBar />
      <SideBar />
      <BottomBar />
    </div>
  );
}
