import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Application, CreateApplicationRequest, UpdateApplicationRequest, ApplicationStatus } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
  private readonly API_URL = environment.jsonServerUrl;

  constructor(private http: HttpClient) {}

  getApplicationsByUserId(userId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.API_URL}/applications?userId=${userId}`);
  }

  addApplication(application: CreateApplicationRequest): Observable<Application> {
    const newApplication = {
      ...application,
      status: application.status || ApplicationStatus.EN_ATTENTE,
      dateAdded: new Date().toISOString()
    };
    return this.http.post<Application>(`${this.API_URL}/applications`, newApplication);
  }

  updateApplication(applicationId: number, updates: UpdateApplicationRequest): Observable<Application> {
    return this.http.patch<Application>(`${this.API_URL}/applications/${applicationId}`, updates);
  }

  removeApplication(applicationId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/applications/${applicationId}`);
  }

  checkIfApplicationExists(userId: number, jobSlug: string): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.API_URL}/applications?userId=${userId}&jobSlug=${jobSlug}`);
  }
}
