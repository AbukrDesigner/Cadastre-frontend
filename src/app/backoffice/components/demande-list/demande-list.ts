import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-demande-list',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, FormsModule],
  templateUrl: './demande-list.html',
  styleUrl: './demande-list.scss',
})
export class DemandeList implements OnInit, OnDestroy {
	currentTitle = 'liste des demandes';
	private destroy$ = new Subject<void>();
	activeTab: 'encours' | 'acceptees' | 'rejetees' = 'encours';
	searchTerm: string = '';
	selectedType: string = '';

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
		this.currentTitle = title ?? 'liste des demandes';
	}

	demandes = [
		{
			numero: 'DE-006-778',
			demandeur: 'Boubacar Baldé',
			typeReclamation: 'Foncière',
			typePropriete: 'Personnel',
			statut: 'En cours'
		},
		{
			numero: 'DE-0098-870',
			demandeur: 'Gérald charo',
			typeReclamation: 'Litiges',
			typePropriete: 'Familiale',
			statut: 'En cours'
		},
		{
			numero: 'DE-456-342',
			demandeur: 'Pavel Alméda',
			typeReclamation: 'Domaniale',
			typePropriete: 'Communautaire',
			statut: 'En cours'
		},
		{
			numero: 'DE-123-456',
			demandeur: 'Marie Dupont',
			typeReclamation: 'Foncière',
			typePropriete: 'Personnel',
			statut: 'Acceptée'
		},
		{
			numero: 'DE-789-012',
			demandeur: 'Jean Martin',
			typeReclamation: 'Litiges',
			typePropriete: 'Familiale',
			statut: 'Acceptée'
		},
		{
			numero: 'DE-345-678',
			demandeur: 'Sophie Bernard',
			typeReclamation: 'Domaniale',
			typePropriete: 'Communautaire',
			statut: 'Acceptée'
		},
		{
			numero: 'DE-901-234',
			demandeur: 'Pierre Durand',
			typeReclamation: 'Foncière',
			typePropriete: 'Personnel',
			statut: 'Rejetée'
		},
		{
			numero: 'DE-567-890',
			demandeur: 'Lucie Moreau',
			typeReclamation: 'Litiges',
			typePropriete: 'Familiale',
			statut: 'Rejetée'
		}
	];

	get filteredDemandes() {
		let filtered = this.demandes;

		// Filtrer par statut selon l'onglet actif
		if (this.activeTab === 'encours') {
			filtered = filtered.filter(d => d.statut === 'En cours');
		} else if (this.activeTab === 'acceptees') {
			filtered = filtered.filter(d => d.statut === 'Acceptée');
		} else {
			filtered = filtered.filter(d => d.statut === 'Rejetée');
		}

		// Filtrer par terme de recherche (numéro ou demandeur)
		if (this.searchTerm) {
			const search = this.searchTerm.toLowerCase();
			filtered = filtered.filter(d => 
				d.numero.toLowerCase().includes(search) || 
				d.demandeur.toLowerCase().includes(search)
			);
		}

		// Filtrer par type de réclamation
		if (this.selectedType && this.selectedType !== '') {
			filtered = filtered.filter(d => d.typeReclamation === this.selectedType);
		}

		return filtered;
	}

	setActive(tab: 'encours' | 'acceptees' | 'rejetees') {
		this.activeTab = tab;
		// Réinitialiser les filtres lors du changement d'onglet
		this.searchTerm = '';
		this.selectedType = '';
		// Réinitialiser le select à la valeur placeholder
		setTimeout(() => {
			const selects = document.querySelectorAll('select[id^="option"]');
			selects.forEach((select: any) => {
				if (select) {
					select.value = '';
				}
			});
		}, 0);
	}


}
