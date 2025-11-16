import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Accordions } from '../../../shared/components/accordions/accordions';
import { MatStepperModule } from '@angular/material/stepper';

@Component({
  selector: 'app-demande-detail',
  standalone: true,
  imports: [CommonModule, Accordions, MatStepperModule],
  templateUrl: './demande-detail.html',
  styleUrl: './demande-detail.scss',
})
export class DemandeDetail {
  activeTab: 'Details' | 'Avis technique' | 'Decision finale' = 'Details';
  searchTerm: string = '';
  selectedType: string = '';
  uploadedFiles: File[] = [];

  setActive(tab: 'Details' | 'Avis technique' | 'Decision finale') {
    this.activeTab = tab;
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    this.uploadedFiles = Array.from(input.files);
  }
}
