import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { Subject, filter, takeUntil } from 'rxjs';
import { UserService, Utilisateur } from '../services/user.service';

@Component({
  selector: 'app-gest-ulisateurs',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, FormsModule, RouterLink],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.scss'],
})
export class GestUlisateurs implements OnInit, OnDestroy {
	currentTitle = 'gestion utilisateurs';
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	activeTab: 'encours' | 'acceptees' | 'rejetees' = 'encours';
	searchTerm: string = '';
	dateFilter: string = ''; // Format ISO interne (aaaa-mm-jj)
	dateFilterDisplay: string = ''; // Format français affiché (dd/mm/yyyy)
	private destroy$ = new Subject<void>();

	// Données de tous les utilisateurs
	utilisateurs: Utilisateur[] = [];

	constructor(
		private userService: UserService,
		public router: Router,
		private route: ActivatedRoute
	) {}

	// Utilisateurs filtrés
	filteredUtilisateurs: Utilisateur[] = [];
	
	// Utilisateurs paginés (affichés dans le tableau)
	paginatedUtilisateurs: Utilisateur[] = [];

	// Configuration de la pagination
	pageSize = 10;
	pageIndex = 0;
	pageSizeOptions = [5, 10, 25, 50];
	totalItems = 0;

	ngOnInit() {
		this.updateTitle(this.route);
		this.router.events
			.pipe(
				filter((e): e is NavigationEnd => e instanceof NavigationEnd),
				takeUntil(this.destroy$)
			)
			.subscribe(() => {
				this.updateTitle(this.route);
			});

		// S'abonner aux changements des utilisateurs
		this.userService.utilisateurs$
			.pipe(takeUntil(this.destroy$))
			.subscribe(utilisateurs => {
				this.utilisateurs = utilisateurs;
				this.applyFilters();
			});
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}

	private updateTitle(route: ActivatedRoute): void {
		let currentRoute: ActivatedRoute | null = route;
		while (currentRoute?.firstChild) {
			currentRoute = currentRoute.firstChild;
		}
		const title = currentRoute?.snapshot.data?.['title'] as string | undefined;
		this.currentTitle = title ?? 'gestion utilisateurs';
	}

	// Filtrage des utilisateurs
	get filteredData() {
		let filtered = [...this.utilisateurs];

		// Filtrer par email
		if (this.searchTerm) {
			const search = this.searchTerm.toLowerCase();
			filtered = filtered.filter(u => 
				u.Email.toLowerCase().includes(search) ||
				u.Prenom.toLowerCase().includes(search) ||
				u.Nom.toLowerCase().includes(search) ||
				u.Telephone.includes(search)
			);
		}

		// Filtrer par date
		if (this.dateFilter) {
			// dateFilter est déjà au format ISO
			filtered = filtered.filter(u => {
				// Normaliser la date de création au format ISO pour la comparaison
				const userDate = this.formatDateToISO(u.Datecreation);
				return userDate === this.dateFilter;
			});
		}

		return filtered;
	}

	// Appliquer les filtres
	applyFilters() {
		this.filteredUtilisateurs = this.filteredData;
		this.totalItems = this.filteredUtilisateurs.length;
		this.pageIndex = 0;
		if (this.paginator) {
			this.paginator.pageIndex = 0;
		}
		this.updatePaginatedData();
	}

	// Mettre à jour les données paginées
	updatePaginatedData() {
		const startIndex = this.pageIndex * this.pageSize;
		const endIndex = startIndex + this.pageSize;
		this.paginatedUtilisateurs = this.filteredUtilisateurs.slice(startIndex, endIndex);
	}

	// Gérer le changement de page
	onPageChange(event: PageEvent) {
		this.pageIndex = event.pageIndex;
		this.pageSize = event.pageSize;
		this.updatePaginatedData();
	}

	// Actions sur les utilisateurs
	voirUtilisateur(utilisateur: Utilisateur) {
		// Encoder l'email pour l'utiliser dans l'URL
		const emailEncoded = encodeURIComponent(utilisateur.Email);
		this.router.navigate(['/backoffice/user-detail', emailEncoded]);
	}

	modifierUtilisateur(utilisateur: Utilisateur) {
		// Encoder l'email pour l'utiliser dans l'URL
		const emailEncoded = encodeURIComponent(utilisateur.Email);
		this.router.navigate(['/backoffice/user-edit', emailEncoded]);
	}

	desactiverOuActiverUtilisateur(utilisateur: Utilisateur) {
		const action = utilisateur.actif ? 'désactiver' : 'activer';
		const actionCapitalized = utilisateur.actif ? 'Désactiver' : 'Activer';
		
		Swal.fire({
			title: `${actionCapitalized} l'utilisateur`,
			text: `Êtes-vous sûr de vouloir ${action} l'utilisateur ${utilisateur.Prenom} ${utilisateur.Nom} ?`,
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: `Oui, ${action}`,
			cancelButtonText: 'Annuler',
			confirmButtonColor: '#0A9748', // primary-color
			cancelButtonColor: '#F67366',  // secondary-color
			buttonsStyling: true
		}).then((result) => {
			if (result.isConfirmed) {
				// Utiliser le service pour mettre à jour l'état
				this.userService.toggleUserStatus(utilisateur.Email);
				const updatedUser = this.userService.getUtilisateurByEmail(utilisateur.Email);
				
				if (updatedUser) {
					// Message de succès
					Swal.fire({
						title: 'Succès',
						text: `L'utilisateur ${updatedUser.Prenom} ${updatedUser.Nom} a été ${updatedUser.actif ? 'activé' : 'désactivé'} avec succès`,
						icon: 'success',
						confirmButtonColor: '#0A9748',
						timer: 2000,
						showConfirmButton: false
					});
				}
			}
		});
	}

	// Recherche en temps réel
	onSearchChange() {
		this.applyFilters();
	}

	// Réinitialiser les filtres
	resetFilters() {
		this.searchTerm = '';
		this.dateFilter = '';
		this.dateFilterDisplay = '';
		this.applyFilters();
	}

	// Gérer le changement de date dans l'input (format français dd/mm/yyyy)
	onDateFilterChange(value: string) {

		// Si vide, réinitialiser
		if (!value || value.trim() === '') {
			this.dateFilterDisplay = '';
			this.dateFilter = '';
			this.applyFilters();
			return;
		}

		// Enlever tout sauf les chiffres pour obtenir les chiffres purs
		let digits = value.replace(/\D/g, '');
		
		// Limiter à 8 chiffres maximum (ddmmyyyy)
		if (digits.length > 8) {
			digits = digits.substring(0, 8);
		}
		
		// Formater avec les slashes automatiquement
		let formatted = '';
		if (digits.length > 0) {
			formatted = digits.substring(0, Math.min(2, digits.length));
		}
		if (digits.length > 2) {
			formatted += '/' + digits.substring(2, Math.min(4, digits.length));
		}
		if (digits.length > 4) {
			formatted += '/' + digits.substring(4, Math.min(8, digits.length));
		}
		
		// Mettre à jour l'affichage (limiter à 10 caractères pour dd/mm/yyyy)
		if (formatted.length > 10) {
			formatted = formatted.substring(0, 10);
		}
		
		// Convertir si la date est complète (10 caractères avec format dd/mm/yyyy)
		if (formatted.length === 10 && this.isValidDateFormat(formatted)) {
			this.dateFilter = this.convertFrenchDateToISO(formatted);
			this.applyFilters();
		} else {
			this.dateFilter = '';
		}
		
		// Mettre à jour l'affichage après conversion
		this.dateFilterDisplay = formatted;
	}

	// Vérifier si la date est au format dd/mm/yyyy
	isValidDateFormat(date: string): boolean {
		const regex = /^\d{2}\/\d{2}\/\d{4}$/;
		if (!regex.test(date)) {
			return false;
		}
		const [jour, mois, annee] = date.split('/');
		const jourNum = parseInt(jour, 10);
		const moisNum = parseInt(mois, 10);
		const anneeNum = parseInt(annee, 10); // Année complète à 4 chiffres
		
		if (moisNum < 1 || moisNum > 12) return false;
		if (jourNum < 1 || jourNum > 31) return false;
		
		const d = new Date(anneeNum, moisNum - 1, jourNum);
		return d.getDate() === jourNum && d.getMonth() === moisNum - 1 && d.getFullYear() === anneeNum;
	}

	// Convertir une date du format français (dd/mm/yyyy) vers ISO (aaaa-mm-jj)
	convertFrenchDateToISO(dateFrench: string): string {
		const [jour, mois, annee] = dateFrench.split('/');
		return `${annee}-${mois}-${jour}`; // Année complète déjà à 4 chiffres
	}

	// Convertir une date ISO vers le format français (dd/mm/yyyy)
	convertISOToFrenchDate(dateISO: string): string {
		if (!dateISO) return '';
		const [annee, mois, jour] = dateISO.split('-');
		return `${jour}/${mois}/${annee}`; // Année complète à 4 chiffres
	}

	// Formater la date pour l'affichage au format dd/mm/yyyy
	formatDate(date: string): string {
		const d = new Date(date);
		const jour = String(d.getDate()).padStart(2, '0');
		const mois = String(d.getMonth() + 1).padStart(2, '0');
		const annee = d.getFullYear(); // Année complète à 4 chiffres
		return `${jour}/${mois}/${annee}`;
	}

	// Convertir une date au format ISO (aaaa-mm-jj) pour la comparaison
	formatDateToISO(date: string): string {
		// Si la date est déjà au format ISO (aaaa-mm-jj), la retourner telle quelle
		if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
			return date;
		}
		// Sinon, convertir au format ISO
		const d = new Date(date);
		if (isNaN(d.getTime())) {
			return date; // Retourner la date originale si elle n'est pas valide
		}
		const jour = String(d.getDate()).padStart(2, '0');
		const mois = String(d.getMonth() + 1).padStart(2, '0');
		const annee = d.getFullYear();
		return `${annee}-${mois}-${jour}`;
	}
}
