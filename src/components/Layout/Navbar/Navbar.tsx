import LogoStudioGhibli from "@/components/Logo/LogoGhibli";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="min-h-[80px] max-h-[100px] w-full flex items-center justify-center py-6 fixed top-0 bg-background backdrop-blur-xl z-30">
      <div className="max-w-[1324px] w-full flex items-center justify-between">
        <Link to="/" className="cursor-pointer">
          <LogoStudioGhibli width={180} height={200} />
        </Link>

        <div className="flex items-center justify-center gap-6">
          <a href="/">Movies</a>
          <a href="/watch-list">WatchList</a>
          <a href="/favorite-films">Favorites</a>
        </div>
      </div>
    </nav>
  );
};
