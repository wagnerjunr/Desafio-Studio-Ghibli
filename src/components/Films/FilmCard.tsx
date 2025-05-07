import type { FilmsType } from "@/types/FilmsType";

interface FilmProps {
  film: FilmsType;
}

export const FilmCard = ({ film }: FilmProps) => {
  const thumbnailCover = film.image;

  return (
    <div className="flex flex-col gap-4 w-full h-fit rounded-lg cursor-pointer transition-all opacity-90 hover:opacity-100 active:scale-95 border border-border p-4">
      <img
        className="rounded-lg h-[180px] w-full object-cover"
        src={thumbnailCover}
        alt="event cover image"
      />

      <div className="flex flex-col gap-1 py-2 rounded-b-lg w-full">
        <p className="font-semibold text-lg truncate overflow-hidden whitespace-nowrap text-ellipsis">
          {film.title}
        </p>
      </div>
    </div>
  );
};
