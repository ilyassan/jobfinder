import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { JobService } from '../../../core/services/job.service';
import { AuthService } from '../../../core/services/auth.service';
import { Job, JobSearchParams } from '../../../core/models';
import { AppState } from '../../../store/app.state';
import * as FavoritesActions from '../../../store/favorites/favorites.actions';
import * as FavoritesSelectors from '../../../store/favorites/favorites.selectors';

@Component({
  selector: 'app-job-search',
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './job-search.component.html',
  styleUrl: './job-search.component.css'
})
export class JobSearchComponent implements OnInit {
  jobs = signal<Job[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');
  currentPage = signal<number>(1);
  itemsPerPage = 10;
  Math = Math;

  constructor(
    private jobService: JobService,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    // Load initial jobs
    this.performSearch({});

    // Load favorites if user is authenticated
    const user = this.authService.getCurrentUser();
    if (user && user.id) {
      this.store.dispatch(FavoritesActions.loadFavorites({ userId: user.id }));
    }
  }

  onSearch(params: JobSearchParams): void {
    this.currentPage.set(1);
    this.performSearch(params);
  }

  private performSearch(params: JobSearchParams): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.jobService.searchJobs(params).subscribe({
      next: (jobs) => {
        this.jobs.set(jobs);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage.set(error.message || 'Failed to load jobs');
        this.isLoading.set(false);
        this.jobs.set([]);
      }
    });
  }

  get paginatedJobs(): Job[] {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.jobs().slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.jobs().length / this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages) {
      this.currentPage.update(page => page + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(page => page - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage.set(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  get pageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    const totalPages = this.totalPages;
    const current = this.currentPage();

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, current - 2);
      let endPage = Math.min(totalPages, current + 2);

      if (current <= 3) {
        endPage = maxPagesToShow;
      }
      if (current >= totalPages - 2) {
        startPage = totalPages - maxPagesToShow + 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isFavorite(jobSlug: string): Observable<boolean> {
    return this.store.select(FavoritesSelectors.selectIsFavorite(jobSlug));
  }

  toggleFavorite(job: Job): void {
    const user = this.authService.getCurrentUser();
    if (!user || !user.id) {
      return;
    }

    this.store.select(FavoritesSelectors.selectFavoriteByJobSlug(job.slug))
      .subscribe(favorite => {
        if (favorite && favorite.id) {
          // Remove from favorites
          this.store.dispatch(FavoritesActions.removeFavorite({ favoriteId: favorite.id }));
        } else {
          // Add to favorites
          this.store.dispatch(FavoritesActions.addFavorite({
            favorite: {
              userId: user.id!,
              jobSlug: job.slug,
              title: job.title,
              company: job.company_name,
              location: job.location,
              url: job.url
            }
          }));
        }
      }).unsubscribe();
  }
}
