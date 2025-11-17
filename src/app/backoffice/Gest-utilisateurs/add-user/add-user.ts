import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-user',
  imports: [RouterLink],
  templateUrl: './add-user.html',
  styleUrl: './add-user.scss',
})
export class AddUser implements OnInit, OnDestroy {
  currentTitle = 'Ajouter un utilisateur';
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
    this.currentTitle = title ?? 'Ajouter un utilisateur';
  }
}
