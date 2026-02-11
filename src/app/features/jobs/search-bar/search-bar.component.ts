import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JobSearchParams } from '../../../core/models';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<JobSearchParams>();

  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      search: [''],
      location: ['']
    });
  }

  onSubmit(): void {
    const params: JobSearchParams = {
      search: this.searchForm.value.search?.trim() || undefined,
      location: this.searchForm.value.location?.trim() || undefined
    };

    this.search.emit(params);
  }

  onClear(): void {
    this.searchForm.reset();
    this.search.emit({});
  }
}
