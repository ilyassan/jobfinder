import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Job, JobSearchResponse, JobSearchParams } from '../models';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  searchJobs(params: JobSearchParams): Observable<Job[]> {
    let httpParams = new HttpParams();

    if (params.search) {
      httpParams = httpParams.set('search', params.search);
    }

    if (params.location) {
      httpParams = httpParams.set('location', params.location);
    }

    if (params.page) {
      httpParams = httpParams.set('page', params.page.toString());
    }

    return this.http.get<JobSearchResponse>(`${this.API_URL}/job-board-api`, { params: httpParams }).pipe(
      map(response => {
        if (!response || !response.data) {
          return [];
        }

        // Filter jobs to ensure keyword is in title, not just description
        let jobs = response.data;

        if (params.search) {
          const searchLower = params.search.toLowerCase();
          jobs = jobs.filter(job =>
            job.title.toLowerCase().includes(searchLower)
          );
        }

        // Sort by creation date (most recent first)
        jobs.sort((a, b) => b.created_at - a.created_at);

        return jobs;
      }),
      catchError(error => {
        console.error('Job search error:', error);
        return throwError(() => new Error('Failed to fetch jobs. Please try again.'));
      })
    );
  }

  getJobBySlug(slug: string): Observable<Job | undefined> {
    return this.searchJobs({}).pipe(
      map(jobs => jobs.find(job => job.slug === slug))
    );
  }
}
