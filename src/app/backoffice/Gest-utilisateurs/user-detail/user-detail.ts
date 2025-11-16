import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subject, takeUntil } from 'rxjs';
import { UserService, Utilisateur } from '../services/user.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss',
})
export class UserDetail implements OnInit, OnDestroy {
	utilisateur: Utilisateur | null = null;
	private destroy$ = new Subject<void>();

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private userService: UserService
	) {}

	ngOnInit() {
		// Récupérer l'email depuis les paramètres de route
		this.route.params
			.pipe(takeUntil(this.destroy$))
			.subscribe(params => {
				const email = decodeURIComponent(params['id']);
				this.loadUtilisateur(email);
			});

		// S'abonner aux changements des utilisateurs pour mettre à jour l'affichage
		this.userService.utilisateurs$
			.pipe(takeUntil(this.destroy$))
			.subscribe(utilisateurs => {
				if (this.utilisateur) {
					const updatedUser = utilisateurs.find(u => u.Email === this.utilisateur!.Email);
					if (updatedUser) {
						this.utilisateur = updatedUser;
					}
				}
			});
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}

	loadUtilisateur(email: string) {
		const user = this.userService.getUtilisateurByEmail(email);
		if (!user) {
			// Si l'utilisateur n'existe pas, rediriger vers la liste
			this.router.navigate(['/backoffice/users']);
			return;
		}
		this.utilisateur = user;
	}

	desactiverOuActiverUtilisateur() {
		if (!this.utilisateur) return;

		const action = this.utilisateur.actif ? 'désactiver' : 'activer';
		const actionCapitalized = this.utilisateur.actif ? 'Désactiver' : 'Activer';
		
		Swal.fire({
			title: `${actionCapitalized} l'utilisateur`,
			text: `Êtes-vous sûr de vouloir ${action} l'utilisateur ${this.utilisateur.Prenom} ${this.utilisateur.Nom} ?`,
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: `Oui, ${action}`,
			cancelButtonText: 'Annuler',
			confirmButtonColor: '#0A9748', // primary-color
			cancelButtonColor: '#F67366',  // secondary-color
			buttonsStyling: true
		}).then((result) => {
			if (result.isConfirmed && this.utilisateur) {
				// Utiliser le service pour mettre à jour l'état
				this.userService.toggleUserStatus(this.utilisateur.Email);
				const updatedUser = this.userService.getUtilisateurByEmail(this.utilisateur.Email);
				
				if (updatedUser) {
					this.utilisateur = updatedUser;
					
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

	formatDate(date: string): string {
		const d = new Date(date);
		const jour = String(d.getDate()).padStart(2, '0');
		const mois = String(d.getMonth() + 1).padStart(2, '0');
		const annee = d.getFullYear();
		return `${jour}/${mois}/${annee}`;
	}

	modifierUtilisateur() {
		if (!this.utilisateur) return;
		// Rediriger vers la page d'édition avec l'email de l'utilisateur
		const emailEncoded = encodeURIComponent(this.utilisateur.Email);
		this.router.navigate(['/backoffice/user-edit', emailEncoded]);
	}
}
