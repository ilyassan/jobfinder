import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../store/app.state';
import { Favorite } from '../../../core/models';
import { AuthService } from '../../../core/services/auth.service';
import * as FavoritesActions from '../../../store/favorites/favorites.actions';
import * as FavoritesSelectors from '../../../store/favorites/favorites.selectors';

@Component({
  selector: 'app-favorites-page',
  imports: [CommonModule],
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.css'
})
export class FavoritesPageComponent implements OnInit {
  favorites$: Observable<Favorite[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {
    this.favorites$ = this.store.select(FavoritesSelectors.selectAllFavorites);
    this.loading$ = this.store.select(FavoritesSelectors.selectFavoritesLoading);
    this.error$ = this.store.select(FavoritesSelectors.selectFavoritesError);
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user && user.id) {
      this.store.dispatch(FavoritesActions.loadFavorites({ userId: user.id }));
    }
  }

  removeFavorite(favoriteId: number | undefined): void {
    if (favoriteId) {
      this.store.dispatch(FavoritesActions.removeFavorite({ favoriteId }));
    }
  }
}
