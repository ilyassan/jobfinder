import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Favorite, CreateFavoriteRequest } from '../models';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly API_URL = environment.jsonServerUrl;

  constructor(private http: HttpClient) {}

  getFavoritesByUserId(userId: number): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${this.API_URL}/favorites?userId=${userId}`);
  }

  addFavorite(favorite: CreateFavoriteRequest): Observable<Favorite> {
    const newFavorite = {
      ...favorite,
      savedAt: new Date().toISOString()
    };
    return this.http.post<Favorite>(`${this.API_URL}/favorites`, newFavorite);
  }

  removeFavorite(favoriteId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/favorites/${favoriteId}`);
  }

  checkIfFavoriteExists(userId: number, jobSlug: string): Observable<Favorite[]> {
    return this.http.get<Favorite[]>(`${this.API_URL}/favorites?userId=${userId}&jobSlug=${jobSlug}`);
  }
}
