import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User, LoginRequest, RegisterRequest } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'jobfinder_user';
  private readonly API_URL = environment.jsonServerUrl;

  currentUser = signal<User | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const storedUser = localStorage.getItem(this.STORAGE_KEY);
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUser.set(user);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        this.logout();
      }
    }
  }

  private saveUserToStorage(user: User): void {
    const { password, ...userWithoutPassword } = user;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(userWithoutPassword));
    this.currentUser.set(userWithoutPassword);
  }

  login(credentials: LoginRequest): Observable<User> {
    return this.http.get<User[]>(`${this.API_URL}/users?email=${credentials.email}`).pipe(
      map(users => {
        if (users.length === 0) {
          throw new Error('User not found');
        }

        const user = users[0];
        if (user.password !== credentials.password) {
          throw new Error('Invalid password');
        }

        return user;
      }),
      tap(user => this.saveUserToStorage(user)),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => new Error(error.message || 'Login failed'));
      })
    );
  }

  register(data: RegisterRequest): Observable<User> {
    // First check if user already exists
    return this.http.get<User[]>(`${this.API_URL}/users?email=${data.email}`).pipe(
      map(users => {
        if (users.length > 0) {
          throw new Error('User already exists with this email');
        }
        return data;
      }),
      // Then create the new user
      map(() => {
        return this.http.post<User>(`${this.API_URL}/users`, data);
      }),
      // Flatten the nested observable
      map(observable => observable),
      tap(observable => {
        observable.subscribe(user => this.saveUserToStorage(user));
      }),
      catchError(error => {
        console.error('Registration error:', error);
        return throwError(() => new Error(error.message || 'Registration failed'));
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUser();
  }

  updateProfile(userId: number, updates: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.API_URL}/users/${userId}`, updates).pipe(
      tap(user => this.saveUserToStorage(user)),
      catchError(error => {
        console.error('Update profile error:', error);
        return throwError(() => new Error('Failed to update profile'));
      })
    );
  }

  deleteAccount(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/users/${userId}`).pipe(
      tap(() => this.logout()),
      catchError(error => {
        console.error('Delete account error:', error);
        return throwError(() => new Error('Failed to delete account'));
      })
    );
  }
}
