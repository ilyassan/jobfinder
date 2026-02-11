import { createAction, props } from '@ngrx/store';
import { Favorite, CreateFavoriteRequest } from '../../core/models';

// Load Favorites
export const loadFavorites = createAction(
  '[Favorites] Load Favorites',
  props<{ userId: number }>()
);

export const loadFavoritesSuccess = createAction(
  '[Favorites] Load Favorites Success',
  props<{ favorites: Favorite[] }>()
);

export const loadFavoritesFailure = createAction(
  '[Favorites] Load Favorites Failure',
  props<{ error: string }>()
);

// Add Favorite
export const addFavorite = createAction(
  '[Favorites] Add Favorite',
  props<{ favorite: CreateFavoriteRequest }>()
);

export const addFavoriteSuccess = createAction(
  '[Favorites] Add Favorite Success',
  props<{ favorite: Favorite }>()
);

export const addFavoriteFailure = createAction(
  '[Favorites] Add Favorite Failure',
  props<{ error: string }>()
);

// Remove Favorite
export const removeFavorite = createAction(
  '[Favorites] Remove Favorite',
  props<{ favoriteId: number }>()
);

export const removeFavoriteSuccess = createAction(
  '[Favorites] Remove Favorite Success',
  props<{ favoriteId: number }>()
);

export const removeFavoriteFailure = createAction(
  '[Favorites] Remove Favorite Failure',
  props<{ error: string }>()
);
