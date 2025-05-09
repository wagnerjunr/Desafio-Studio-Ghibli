import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FilmRating {
  id: string;
  rating: number;
}
interface NoteFilmsInterface {
  id: string;
  note: string;
}

interface FilmsState {
  //Variaveis de estado que serão usadas no componente
  favorites: string[];
  watchFilms: string[];
  noteFilms: NoteFilmsInterface[];
  ratings: FilmRating[];
  watchList: string[];

  //Funções que farão alterações no estado corformes as ações do usuário (adicionar uma anotação/avaliação, adicionar/remover da lista de favoritos, etc)
  addToFavorites: (filmId: string) => void;
  removeFromFavorites: (filmId: string) => void;
  addToWatchFilms: (filmId: string) => void;
  addToWatchList: (filmId: string) => void;
  removeFromWatchList: (filmId: string) => void;
  removeFromWatchFilms: (filmId: string) => void;
  addToNoteFilm: (filmId: string, note: string) => void;
  updateNoteFilm: (filmId: string, note: string) => void;
  removeFromNoteFilm: (filmId: string) => void;
  removeFilmRating: (filmId: string) => void;
  rateFilm: (filmId: string, rating: number) => void;

  //Funções que retornarão informações sobre o estado relacionado a um filme (baseado em seu id)
  isFavorite: (filmId: string) => boolean;
  isInWatchFilms: (filmId: string) => boolean;
  isInWatchList: (filmId: string) => boolean;
  getFilmRating: (filmId: string) => number | null;
  getNoteFilm: (filmId: string) => string | null;
}

export const useFilmsStore = create<FilmsState>()(
  persist(
    (set, get) => ({
      favorites: [],
      watchFilms: [],
      noteFilms: [],
      ratings: [],
      watchList: [],

      addToFavorites: (filmId) =>
        set((state) => ({
          favorites: [...state.favorites, filmId],
        })),

      removeFromFavorites: (filmId) =>
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== filmId),
        })),

      addToNoteFilm: (filmId, note) =>
        set((state) => ({
          noteFilms: [...state.noteFilms, { id: filmId, note }],
        })),

      updateNoteFilm: (filmId, note) =>
        set((state) => ({
          noteFilms: state.noteFilms.map((film) =>
            film.id === filmId ? { ...film, note } : film
          ),
        })),

      removeFromNoteFilm: (filmId) =>
        set((state) => ({
          noteFilms: state.noteFilms.filter((film) => film.id !== filmId),
        })),

      removeFilmRating: (filmId) =>
        set((state) => ({
          ratings: state.ratings.filter((rating) => rating.id !== filmId),
        })),

      addToWatchFilms: (filmId) =>
        set((state) => ({
          watchFilms: [...state.watchFilms, filmId],
        })),

      removeFromWatchFilms: (filmId) =>
        set((state) => ({
          watchFilms: state.watchFilms.filter((id) => id !== filmId),
        })),

      addToWatchList: (filmId) =>
        set((state) => ({
          watchList: [...state.watchList, filmId],
        })),

      removeFromWatchList: (filmId) =>
        set((state) => ({
          watchList: state.watchList.filter((id) => id !== filmId),
        })),

      isInWatchList: (filmId) => get().watchList.includes(filmId),

      rateFilm: (filmId, rating) =>
        set((state) => {
          const existingRatingIndex = state.ratings.findIndex(
            (r) => r.id === filmId
          );

          if (existingRatingIndex >= 0) {
            const newRatings = [...state.ratings];
            newRatings[existingRatingIndex] = { id: filmId, rating };
            return { ratings: newRatings };
          }

          return {
            ratings: [...state.ratings, { id: filmId, rating }],
          };
        }),
      getNoteFilm: (filmId) => {
        const note = get().noteFilms.find((r) => r.id === filmId);
        return note ? note.note : null;
      },

      isFavorite: (filmId) => get().favorites.includes(filmId),

      isInWatchFilms: (filmId) => get().watchFilms.includes(filmId),

      getFilmRating: (filmId) => {
        const rating = get().ratings.find((r) => r.id === filmId);
        return rating ? rating.rating : null;
      },
    }),
    {
      name: "films-storage",
    }
  )
);
