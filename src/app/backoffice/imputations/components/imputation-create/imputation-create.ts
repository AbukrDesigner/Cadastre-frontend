import { Component } from '@angular/core';
import { Accordions } from '../../../../shared/components/accordions/accordions';
import { MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-imputation-create',
  standalone: true,
  imports: [Accordions, MatStepperModule],
  templateUrl: './imputation-create.html',
  styleUrl: './imputation-create.scss',
})
export class ImputationCreate {
  constructor(private route: Router){}

  Agree() {
    Swal.fire({
      title: 'Confirmation',
      html: 'Souhaitez-vous <strong>Accepter</strong> cette réclamation ?',
      icon: 'warning',
      iconColor: '#FF8C42',
      showCancelButton: true,
      confirmButtonText: 'Oui, j\'accepte',
      cancelButtonText: 'Non',
      confirmButtonColor: '#0A9748',
      cancelButtonColor: '#F67366',
      buttonsStyling: true,
      customClass: {
        cancelButton: 'swal-cancel-btn'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Logique à exécuter lorsque l'utilisateur confirme
        // TODO: Implémenter la logique d'acceptation de la réclamation
        Swal.fire({
          icon:'success',
          html:`La réclamation à été <span class="fw-bold">reçu</span> avec succès.`,
          timer:3000,
          showConfirmButton: false,
        })
        this.route.navigate(['/backoffice/imputation-diffusion'])
      }
    });
  }
}
