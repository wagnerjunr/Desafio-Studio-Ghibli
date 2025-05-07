import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FilmRating {
  id: string;
  rating: number;
}

interface FilmsState {
  favorites: string[];
  watchlist: string[];
  ratings: FilmRating[];
  addToFavorites: (filmId: string) => void;
  removeFromFavorites: (filmId: string) => void;
  addToWatchlist: (filmId: string) => void;
  removeFromWatchlist: (filmId: string) => void;
  rateFilm: (filmId: string, rating: number) => void;
  isFavorite: (filmId: string) => boolean;
  isInWatchlist: (filmId: string) => boolean;
  getFilmRating: (filmId: string) => number | null;
}

export const useFilmsStore = create<FilmsState>()(
  persist(
    (set, get) => ({
      favorites: [],
      watchlist: [],
      ratings: [],
      
      addToFavorites: (filmId) => 
        set((state) => ({
          favorites: [...state.favorites, filmId]
        })),
        
      removeFromFavorites: (filmId) => 
        set((state) => ({
          favorites: state.favorites.filter(id => id !== filmId)
        })),
        
      addToWatchlist: (filmId) => 
        set((state) => ({
          watchlist: [...state.watchlist, filmId]
        })),
        
      removeFromWatchlist: (filmId) => 
        set((state) => ({
          watchlist: state.watchlist.filter(id => id !== filmId)
        })),
        
      rateFilm: (filmId, rating) => 
        set((state) => {
          const existingRatingIndex = state.ratings.findIndex(r => r.id === filmId);
          
          if (existingRatingIndex >= 0) {
            const newRatings = [...state.ratings];
            newRatings[existingRatingIndex] = { id: filmId, rating };
            return { ratings: newRatings };
          }
          
          return {
            ratings: [...state.ratings, { id: filmId, rating }]
          };
        }),
        
      isFavorite: (filmId) => 
        get().favorites.includes(filmId),
        
      isInWatchlist: (filmId) => 
        get().watchlist.includes(filmId),
        
      getFilmRating: (filmId) => {
        const rating = get().ratings.find(r => r.id === filmId);
        return rating ? rating.rating : null;
      }
    }),
    {
      name: 'films-storage',
    }
  )
);