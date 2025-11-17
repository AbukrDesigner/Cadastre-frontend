import { Component, AfterViewInit } from '@angular/core';
import { Accordions } from '../../../../shared/components/accordions/accordions';
import { MatStepperModule } from '@angular/material/stepper';
import { Modals } from '../../../../shared/components/modals/modals';

declare var bootstrap: any;

@Component({
  selector: 'app-imputation-diffusion',
  standalone: true,
  imports: [Accordions, MatStepperModule, Modals],
  templateUrl: './imputation-diffusion.html',
  styleUrl: './imputation-diffusion.scss',
})
export class ImputationDiffusion implements AfterViewInit {
  private modalInstance: any;

  ngAfterViewInit() {
    // Initialiser l'instance Bootstrap du modal après que la vue soit initialisée
    const modalElement = document.getElementById('exampleModal');
    if (modalElement && typeof bootstrap !== 'undefined') {
      this.modalInstance = new bootstrap.Modal(modalElement);
    }
  }

  openModal() {
    if (this.modalInstance) {
      this.modalInstance.show();
    } else {
      // Fallback si l'instance n'est pas encore initialisée
      const modalElement = document.getElementById('exampleModal');
      if (modalElement && typeof bootstrap !== 'undefined') {
        this.modalInstance = new bootstrap.Modal(modalElement);
        this.modalInstance.show();
      }
    }
  }
}
