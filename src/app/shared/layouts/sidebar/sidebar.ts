import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone:true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit, OnDestroy {
  isDropdownOpen = false;
  isSidebarCollapsed = false;
  currentTitle = 'Tableau de bord';
  isParametresMenuOpen = false;
  private destroy$ = new Subject<void>();

  constructor(public router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.updateTitle(this.route);
    this.checkAndOpenMenu();

    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.updateTitle(this.route);
        this.checkAndOpenMenu();
      });
  }

  private checkAndOpenMenu(): void {
    // Ouvrir le menu Paramètres si on est sur une route enfant (comme /backoffice/users)
    if (this.router.url.includes('/backoffice/users')) {
      this.isParametresMenuOpen = true;
    }
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
    this.currentTitle = title ?? 'Tableau de bord';
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  toggleParametresMenu() {
    this.isParametresMenuOpen = !this.isParametresMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-card-wrapper')) {
      this.isDropdownOpen = false;
    }
  }

  goToAccount() {
    this.isDropdownOpen = false;
    // navigation to account page can be implemented here
  }

  logout() {
    this.isDropdownOpen = false;

    Swal.fire({
      title: 'Déconnexion',
      text: 'Êtes-vous sûr de vouloir vous déconnecter ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui, me déconnecter',
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#0A9748', // primary-color
      cancelButtonColor: '#F67366',  // secondary-color
      buttonsStyling: true
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: implémenter la vraie déconnexion (service + navigation)
        // Nettoyage simple côté client (ajustez selon votre logique d'authentification)
        try {
          localStorage.clear();
          sessionStorage.clear();
        } catch {}

        // Redirection vers la page de connexion
        this.router.navigate(['/auth/']);
      }
    });
  }
}
