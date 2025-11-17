import { Component, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { Accordions } from '../../../../shared/components/accordions/accordions';
import { MatStepperModule } from '@angular/material/stepper';
import { Modals } from '../../../../shared/components/modals/modals';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';

declare var bootstrap: any;

@Component({
  selector: 'app-imputation-diffusion',
  standalone: true,
  imports: [Accordions, MatStepperModule, Modals],
  templateUrl: './imputation-diffusion.html',
  styleUrl: './imputation-diffusion.scss',
})
export class ImputationDiffusion implements AfterViewInit, OnInit, OnDestroy {
  currentTitle = 'Imputation';
  private destroy$ = new Subject<void>();
  private modalInstance: any;

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
    this.currentTitle = title ?? 'Imputation';
  }

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
