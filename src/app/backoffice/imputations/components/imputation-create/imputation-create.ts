import { Component, OnDestroy, OnInit } from '@angular/core';
import { Accordions } from '../../../../shared/components/accordions/accordions';
import { MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-imputation-create',
  standalone: true,
  imports: [Accordions, MatStepperModule],
  templateUrl: './imputation-create.html',
  styleUrl: './imputation-create.scss',
})
export class ImputationCreate implements OnInit, OnDestroy {
  currentTitle = 'Créer une imputation';
  private destroy$ = new Subject<void>();

  constructor(
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.updateTitle(this.route);
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.updateTitle(this.route);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateTitle(route: ActivatedRoute): void {
    let currentRoute: ActivatedRoute | null = route;
    while (currentRoute?.firstChild) {
      currentRoute = currentRoute.firstChild;
    }
    const title = currentRoute?.snapshot.data?.['title'] as string | undefined;
    this.currentTitle = title ?? 'Créer une imputation';
  }

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
        this.router.navigate(['/backoffice/imputation-diffusion'])
      }
    });
  }
}
