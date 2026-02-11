import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { FavoritesService } from '../../core/services/favorites.service';
import * as FavoritesActions from './favorites.actions';

@Injectable()
export class FavoritesEffects {
  constructor(
    private actions$: Actions,
    private favoritesService: FavoritesService
  ) {}

  loadFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.loadFavorites),
      switchMap(({ userId }) =>
        this.favoritesService.getFavoritesByUserId(userId).pipe(
          map(favorites => FavoritesActions.loadFavoritesSuccess({ favorites })),
          catchError(error =>
            of(FavoritesActions.loadFavoritesFailure({ error: error.message || 'Failed to load favorites' }))
          )
        )
      )
    )
  );

  addFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.addFavorite),
      switchMap(({ favorite }) =>
        this.favoritesService.addFavorite(favorite).pipe(
          map(newFavorite => FavoritesActions.addFavoriteSuccess({ favorite: newFavorite })),
          catchError(error =>
            of(FavoritesActions.addFavoriteFailure({ error: error.message || 'Failed to add favorite' }))
          )
        )
      )
    )
  );

  removeFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.removeFavorite),
      switchMap(({ favoriteId }) =>
        this.favoritesService.removeFavorite(favoriteId).pipe(
          map(() => FavoritesActions.removeFavoriteSuccess({ favoriteId })),
          catchError(error =>
            of(FavoritesActions.removeFavoriteFailure({ error: error.message || 'Failed to remove favorite' }))
          )
        )
      )
    )
  );
}
