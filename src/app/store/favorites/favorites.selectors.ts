import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FavoritesState } from './favorites.state';

export const selectFavoritesState = createFeatureSelector<FavoritesState>('favorites');

export const selectAllFavorites = createSelector(
  selectFavoritesState,
  (state: FavoritesState) => state.favorites
);

export const selectFavoritesLoading = createSelector(
  selectFavoritesState,
  (state: FavoritesState) => state.loading
);

export const selectFavoritesError = createSelector(
  selectFavoritesState,
  (state: FavoritesState) => state.error
);

export const selectFavoriteByJobSlug = (jobSlug: string) => createSelector(
  selectAllFavorites,
  (favorites) => favorites.find(fav => fav.jobSlug === jobSlug)
);

export const selectIsFavorite = (jobSlug: string) => createSelector(
  selectAllFavorites,
  (favorites) => favorites.some(fav => fav.jobSlug === jobSlug)
);

export const selectFavoritesCount = createSelector(
  selectAllFavorites,
  (favorites) => favorites.length
);
