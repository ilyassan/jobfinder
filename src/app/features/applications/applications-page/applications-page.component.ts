import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApplicationsService } from '../../../core/services/applications.service';
import { AuthService } from '../../../core/services/auth.service';
import { Application, ApplicationStatus } from '../../../core/models';

@Component({
  selector: 'app-applications-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './applications-page.component.html',
  styleUrl: './applications-page.component.css'
})
export class ApplicationsPageComponent implements OnInit {
  applications = signal<Application[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');
  editingNotes: { [key: number]: boolean } = {};
  notesForm: { [key: number]: FormGroup } = {};

  ApplicationStatus = ApplicationStatus;

  constructor(
    private applicationsService: ApplicationsService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    const user = this.authService.getCurrentUser();
    if (!user || !user.id) {
      return;
    }

    this.isLoading.set(true);
    this.applicationsService.getApplicationsByUserId(user.id).subscribe({
      next: (applications) => {
        this.applications.set(applications);
        // Initialize forms for notes
        applications.forEach(app => {
          if (app.id) {
            this.notesForm[app.id] = this.fb.group({
              notes: [app.notes || '']
            });
          }
        });
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage.set(error.message || 'Failed to load applications');
        this.isLoading.set(false);
      }
    });
  }

  updateStatus(applicationId: number | undefined, newStatus: ApplicationStatus): void {
    if (!applicationId) return;

    this.applicationsService.updateApplication(applicationId, { status: newStatus }).subscribe({
      next: () => {
        this.loadApplications();
      },
      error: (error) => {
        alert('Failed to update status: ' + error.message);
      }
    });
  }

  toggleEditNotes(applicationId: number): void {
    this.editingNotes[applicationId] = !this.editingNotes[applicationId];
  }

  saveNotes(applicationId: number): void {
    const form = this.notesForm[applicationId];
    if (!form) return;

    const notes = form.value.notes;
    this.applicationsService.updateApplication(applicationId, { notes }).subscribe({
      next: () => {
        this.editingNotes[applicationId] = false;
        this.loadApplications();
      },
      error: (error) => {
        alert('Failed to save notes: ' + error.message);
      }
    });
  }

  removeApplication(applicationId: number | undefined): void {
    if (!applicationId) return;

    if (confirm('Are you sure you want to remove this application?')) {
      this.applicationsService.removeApplication(applicationId).subscribe({
        next: () => {
          this.loadApplications();
        },
        error: (error) => {
          alert('Failed to remove application: ' + error.message);
        }
      });
    }
  }

  getStatusClass(status: ApplicationStatus): string {
    switch (status) {
      case ApplicationStatus.EN_ATTENTE:
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case ApplicationStatus.ACCEPTE:
        return 'bg-green-100 text-green-800 border-green-300';
      case ApplicationStatus.REFUSE:
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  }

  getStatusLabel(status: ApplicationStatus): string {
    switch (status) {
      case ApplicationStatus.EN_ATTENTE:
        return 'En attente';
      case ApplicationStatus.ACCEPTE:
        return 'Accepté';
      case ApplicationStatus.REFUSE:
        return 'Refusé';
      default:
        return status;
    }
  }
}
