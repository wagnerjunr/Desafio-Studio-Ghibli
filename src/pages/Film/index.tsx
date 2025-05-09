import { useParams } from "react-router-dom";
import { useGetFilm } from "@/hooks/useGetFilm";
import { Clock, Star } from "lucide-react";
import { formatTime } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFilmsStore } from "@/store/useFilmsStore";
import { LoadingComponent } from "@/components/LoadingComponent/LoadingComponent";

export const FilmPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: film, isLoading } = useGetFilm({ filmId: id as string });
  const { getNoteFilm, getFilmRating } = useFilmsStore();
  const noteFilm = getNoteFilm(id as string);
  const filmRating = getFilmRating(id as string);

  const thumbnailCover = film?.image;

  if (isLoading) {
    return <LoadingComponent/>
  }

  const renderRatingStars = (rating: number | undefined) => {
    if (!rating) return null;

    return (
      <div className="flex items-center gap-1">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Star
              key={index}
              size={18}
              fill={index < rating ? "gold" : "none"}
              color={index < rating ? "gold" : "gray"}
            />
          ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full min-h-full justify-center py-6 gap-4 max-w-[1324px] mt-[125px]">
      <div className="flex flex-col md:flex-row gap-8 h-full">
        <div className="md:w-2/5 relative">
          {filmRating && (
            <div className="absolute top-4 left-4 bg-black/70 p-2 rounded-lg z-10 flex items-center gap-2">
              {renderRatingStars(filmRating)}
            </div>
          )}

          <img
            className="rounded-[12px] w-full h-[550px] object-cover"
            src={thumbnailCover}
            alt={`Capa do filme ${film?.title}`}
          />
        </div>

        <div className="flex flex-col gap-6 md:w-3/5">
          <h1 className="font-bold text-4xl md:text-5xl lg:text-[60px]">
            {film?.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-[48px] h-full">
            <div className="flex flex-col gap-4 h-full">
              <div className="flex items-center gap-8 mt-6">
                <div className="flex items-center gap-2">
                  <Star size={20} fill="gold" color="gold" />
                  <p className="text-base">{film?.rt_score}/100</p>
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-green-500" />
                  <p className="text-base">
                    {formatTime(film?.running_time as string)}
                  </p>
                </div>
              </div>

              <Tabs defaultValue="description" className="mt-6">
                <TabsList className="mb-4">
                  <TabsTrigger value="description" className="w-[150px]">
                    Sinopse
                  </TabsTrigger>
                  <TabsTrigger value="review" className="w-[150px]">
                    Anotação
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="description">
                  <div>
                    <p className="text-gray-700">{film?.description}</p>
                  </div>
                </TabsContent>
                <TabsContent value="review">
                  <div className="flex flex-col gap-6">
                    <p className="text-gray-700">
                      {noteFilm || "Nenhum comentário adicionado."}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="flex flex-col gap-14 mt-6 md:ml-10">
              <div className="border-t-2 border-border">
                <p className="text-[20px] font-semibold text-blue-800/60">
                  Diretor
                </p>
                <p className="text-gray-700 text-base">{film?.director}</p>
              </div>

              <div className="border-t-2 border-border">
                <p className="text-[20px] font-semibold text-blue-800/60">
                  Produtor
                </p>
                <p className="text-gray-700 text-base">{film?.producer}</p>
              </div>

              <div className="border-t-2 border-border">
                <p className="text-[20px] font-semibold text-blue-800/60">
                  Ano de lançamento: {film?.release_date}{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
