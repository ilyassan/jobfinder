import { createReducer, on } from '@ngrx/store';
import { FavoritesState, initialFavoritesState } from './favorites.state';
import * as FavoritesActions from './favorites.actions';

export const favoritesReducer = createReducer(
  initialFavoritesState,

  // Load Favorites
  on(FavoritesActions.loadFavorites, (state): FavoritesState => ({
    ...state,
    loading: true,
    error: null
  })),

  on(FavoritesActions.loadFavoritesSuccess, (state, { favorites }): FavoritesState => ({
    ...state,
    favorites,
    loading: false,
    error: null
  })),

  on(FavoritesActions.loadFavoritesFailure, (state, { error }): FavoritesState => ({
    ...state,
    loading: false,
    error
  })),

  // Add Favorite
  on(FavoritesActions.addFavorite, (state): FavoritesState => ({
    ...state,
    loading: true,
    error: null
  })),

  on(FavoritesActions.addFavoriteSuccess, (state, { favorite }): FavoritesState => ({
    ...state,
    favorites: [...state.favorites, favorite],
    loading: false,
    error: null
  })),

  on(FavoritesActions.addFavoriteFailure, (state, { error }): FavoritesState => ({
    ...state,
    loading: false,
    error
  })),

  // Remove Favorite
  on(FavoritesActions.removeFavorite, (state): FavoritesState => ({
    ...state,
    loading: true,
    error: null
  })),

  on(FavoritesActions.removeFavoriteSuccess, (state, { favoriteId }): FavoritesState => ({
    ...state,
    favorites: state.favorites.filter(fav => fav.id !== favoriteId),
    loading: false,
    error: null
  })),

  on(FavoritesActions.removeFavoriteFailure, (state, { error }): FavoritesState => ({
    ...state,
    loading: false,
    error
  }))
);
