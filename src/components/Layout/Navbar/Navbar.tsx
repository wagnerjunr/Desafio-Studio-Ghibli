import LogoStudioGhibli from "@/components/Logo/LogoGhibli";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const currentPagePathLine =
    "after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-primary";

  return (
    <nav className="min-h-[80px] max-h-[130px] w-full flex items-center justify-center py-6 fixed top-0 bg-background backdrop-blur-xl z-50">
      <div className="max-w-[1324px] w-full flex flex-col items-center sm:flex-row sm:items-center sm:justify-between gap-4">
        <Link to="/" className="cursor-pointer">
          <LogoStudioGhibli width={180} height={80} />
        </Link>

        <div className="flex items-center justify-center gap-6">
          <Link
            to="/"
            className={`relative ${currentPath === "/" ? currentPagePathLine : ""}`}
          >
            Filmes
          </Link>
          <Link
            to="/watch-list"
            className={`relative ${currentPath === "/watch-list" ? currentPagePathLine : ""}`}
          >
            Minha Lista
          </Link>
          <Link
            to="/favorite-films"
            className={`relative ${currentPath === "/favorite-films" ? currentPagePathLine : ""}`}
          >
            Favoritos
          </Link>
        </div>
      </div>
    </nav>
  );
};
