import { Component } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-depose',
  imports: [MatStepperModule, CommonModule, BreadcrumbComponent],
  templateUrl: './depose.html',
  styleUrl: './depose.scss',
})
export class Depose {
  isDragOver = false;
  selectedFiles: File[] = [];
  maxFileSize = 10 * 1024 * 1024; // 10MB en bytes
  private readonly stepTitles = [
    'informations de la demande',
    'informations du demandeur',
    'informations de la propriété',
    'pièces à joindre'
  ];
  currentStepTitle = this.stepTitles[0];

  onStepChange(event: StepperSelectionEvent) {
    this.currentStepTitle = this.stepTitles[event.selectedIndex] ?? this.currentStepTitle;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files);
    }
  }

  handleFiles(files: FileList) {
    Array.from(files).forEach(file => {
      if (file.size <= this.maxFileSize) {
        // Vérifier si le fichier n'est pas déjà dans la liste
        if (!this.selectedFiles.some(f => f.name === file.name && f.size === file.size)) {
          this.selectedFiles.push(file);
        }
      } else {
        alert(`Le fichier ${file.name} dépasse la taille maximale de 10MB`);
      }
    });
  }

  removeFile(file: File) {
    this.selectedFiles = this.selectedFiles.filter(f => f !== file);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  //Lorsque l'on soummet une demande
  Soumission(){
    Swal.fire({
      title:'Soumission',
      text:'Demande soumise avec succès.',
      icon:'success',
      showConfirmButton:false,
      timer: 3000
    })
  }
}
