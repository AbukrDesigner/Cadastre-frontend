import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Accordions } from '../../../shared/components/accordions/accordions';
import { MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-demande-detail',
  standalone: true,
  imports: [CommonModule, Accordions, MatStepperModule],
  templateUrl: './demande-detail.html',
  styleUrl: './demande-detail.scss',
})
export class DemandeDetail implements OnInit, OnDestroy {
  currentTitle = "Detail d'une demande";
  private destroy$ = new Subject<void>();
  activeTab: 'Details' | 'Avis technique' | 'Decision finale' = 'Details';
  searchTerm: string = '';
  selectedType: string = '';
  uploadedFiles: File[] = [];

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
    this.currentTitle = title ?? "Detail d'une demande";
  }

  setActive(tab: 'Details' | 'Avis technique' | 'Decision finale') {
    this.activeTab = tab;
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    this.uploadedFiles = Array.from(input.files);
  }
}
