import { FavoriteButton } from "./FavoriteButton";
import { WatchedButton } from "./WatchedButton";
import { WatchListButton } from "./WatchListButton";

interface FilmActionButtonsProps {
  filmId: string;
}

export const FilmActionButtons = ({ filmId }: FilmActionButtonsProps) => {
  return (
    <div className="flex gap-2">
      <FavoriteButton filmId={filmId} />
      <WatchedButton filmId={filmId} />
      <WatchListButton filmId={filmId} />
    </div>
  );
};